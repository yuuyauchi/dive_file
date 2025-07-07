import asyncio
import json
import os
import re
from urllib.parse import urlparse
from typing import List
import pandas as pd
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig
from crawl4ai.extraction_strategy import LLMExtractionStrategy
from extract_shop_info import extract_shop_info
from get_place_details import get_reviews
from diving_course_normalizer import correct_diving_course_spelling
import uuid

# 環境変数の読み込み
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

# 正規表現パターン
pattern = r"^(https?://)([^/]+)"

# モデル定義
class Course(BaseModel):
    name: str
    price: int
    level: str

class ArticleData(BaseModel):
    course_list: List[Course] = Field(
        ..., description="ダイビングのコース名と価格のリスト",
        examples=[
            {"name": "Open Water Diver", "price": 39800, "level": "beginner"},
            {"name": "Advanced Open Water Diver", "price": 49800, "level": "intermediate"}
        ]
    )

# 各種関数定義
def load_license_data(path: str) -> tuple:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get("license", []), data.get("specialities", [])

def sanitize_filename(url: str) -> str:
    parsed = urlparse(url)
    domain = parsed.netloc.replace('.', '_')
    path = parsed.path.strip('/').replace('/', '_') or ''
    return f"{domain}_{path}.json"

def get_web_search_prompt(hostname: str, license_list, specialty_list) -> str:
    return f"""
        以下のサイトで提供されているダイビングライセンスのコース情報とそのURLを取得してJSON形式で返してください。
        ・サイトURL
        {hostname}

        以下の情報を抽出してください。
        course_name: ライセンスのコース名あるいはスペシャリティコース名, examples="Open Water Diver"
        price: コースの価格, examples="39800"

        以下の出力形式に従い、ライセンス名と価格のペアの形で共有してください。

        ・出力形式
        "course_list": [
            {{"name": "Open Water Diver", "price": 49800, "level": "beginner"}},
            {{"name": "Advanced Open Water Diver", "price": 49800, "level": "intermediate"}}
        ]

        以下のライセンスリストとスペシャリティリストと同じ内容がある場合、以下のリストの名前に表記を揃えてください。
        ・ライセンスリスト
        {license_list}
        ・スペシャリティリスト
        {specialty_list}
    """

def search_web(query):
    response = client.chat.completions.create(
        model="gpt-4o-search-preview",
        web_search_options={
            "search_context_size": "high",
            "user_location": {"type": "approximate", "approximate": {"country": "JP"}},
        },
        messages=[{"role": "user", "content": query}],
    )
    return response.choices[0].message.content

extract_prompt = """
    以下のテキストからJSONを抽出してください。
    {text}
"""

async def extract_course_info_from_url(url: str, license_list, specialty_list) -> dict:
    llm_strategy = LLMExtractionStrategy(
        llm_config=LLMConfig(provider="openai/gpt-4.1-nano", api_token=openai_api_key),
        schema=ArticleData.model_json_schema(),
        extraction_type="schema",
        force_json_response=True,
        instruction=f"""
        以下のWebページの内容から、ダイビングショップのコース情報を抽出してください。
        {license_list}
        {specialty_list}
        """
    )
    config = CrawlerRunConfig(
        exclude_external_links=True,
        word_count_threshold=20,
        extraction_strategy=llm_strategy,
        remove_forms=True,
        exclude_internal_links=True,
    )
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url, config=config)
        return json.loads(result.extracted_content)

def merge_and_clean_course_info(course_info_dict, web_search_json, target_url):
    try:
        if isinstance(course_info_dict["course_list"], dict):
            course_info_dict["course_list"] = [course_info_dict["course_list"]]
        course_info_dict["course_list"].extend(web_search_json.get("course_list", []))
        df = pd.DataFrame(course_info_dict["course_list"]).drop_duplicates(subset="name").reset_index(drop=True)
        fixed_dict = json.loads(df.to_json(orient="index"))
        course_info_dict["course_list"] = list(fixed_dict.values())
        return course_info_dict
    except Exception as e:
        print(f"❌ course_listマージエラー: {e} - {target_url} スキップします。")
        return None

def save_result(data: dict, filename: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    path = os.path.join(output_dir, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"✅ 保存完了: {path}")

async def process_url(target_url: str, license_list, specialty_list, output_dir: str):
    # try:
    print(f"\n🔍 処理中: {target_url}")
    hostname = re.match(pattern, target_url).group(0)
    course_info_json = await extract_course_info_from_url(target_url, license_list, specialty_list)
    shop_info_json = await extract_shop_info(hostname)

    course_info_dict = course_info_json[0] if isinstance(course_info_json, list) else course_info_json
    course_name_list = license_list + specialty_list
    course_info_dict["name"] = correct_diving_course_spelling(course_info_dict["name"], client, course_name_list)
    shop_info_dict = shop_info_json[0] if isinstance(shop_info_json, list) else shop_info_json

    if "course_list" not in course_info_dict:
        course_info_dict = {"course_list": course_info_dict}

    web_search_prompt = get_web_search_prompt(hostname, license_list, specialty_list)
    course_info_text = search_web(web_search_prompt)

    response = client.chat.completions.create(
        model="gpt-4.1-nano",
        temperature=0.0,
        messages=[{"role": "user", "content": extract_prompt.format(text=course_info_text)}],
        response_format={"type": "json_object"}
    )
    web_search_json = json.loads(response.choices[0].message.content)

    merged = merge_and_clean_course_info(course_info_dict, web_search_json, target_url)
    if merged is None:
        return
    shop_info_dict.update(merged)
    reviews_dict = get_reviews(shop_info_dict["name"])
    shop_info_dict.update(reviews_dict)
    shop_info_dict.update({"id": str(uuid.uuid4())})

    filename = sanitize_filename(target_url)
    save_result(shop_info_dict, filename, output_dir)

def load_json(path: str) -> List[dict]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
    
def merge_dive_shop_info(df: pd.DataFrame) -> pd.DataFrame:
    def merge_rows(group):
        first_row = group.iloc[0].copy()

        # course_list 統合
        all_courses = []
        for courses in group['course_list']:
            all_courses.extend(courses)
        all_course_list = []
        name_list = []
        for course in all_courses:
            if course['name'] in name_list:
                print(f"Duplicate course name found: {course['name']}")
                continue
            all_course_list.append(course)
            name_list.append(course['name'])
        first_row['course_list'] = all_course_list
        return first_row

    merged_df = df.groupby('name', as_index=False).apply(merge_rows).reset_index(drop=True)
    return merged_df


async def main():
    license_list, specialty_list = load_license_data("backend/dive_info.json")
    output_dir = "output"
    shop_entries = load_json("backend/shop_urls.json")
    course_description = load_json("backend/course_description.json")
    for idx, entry in enumerate(shop_entries):
        url = entry["url"]
        # prefecture = entry["prefecture"]
        # name = entry["name"]
        is_checked = entry.get("is_checked", False)
        try:
            if is_checked:
                # print(f"✅ {prefecture} - {name} は既に処理済みです。")
                continue
            else:
                # print(f"🔍 {prefecture} - {name} を処理中...")
                await process_url(url, license_list, specialty_list, output_dir)
                shop_entries[idx]["is_checked"] = True
        except Exception as e:
            shop_entries[idx]["is_checked"] = False
            print(e)
            continue
    save_result(shop_entries, "backend/shop_urls.json", "./")
    path_list = os.listdir(f"{output_dir}")
    data_list = []
    for file_name in path_list:
        with open(f"{output_dir}/{file_name}", "r", encoding="utf-8") as f:
            data = json.load(f)
        data_list.append(data)
    df = pd.DataFrame(data_list)
    merged_df = merge_dive_shop_info(df)
    merged_df.to_csv("sample.csv", index=False)

if __name__ == "__main__":
    asyncio.run(main())
