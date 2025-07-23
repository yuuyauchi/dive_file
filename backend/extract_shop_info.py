import json
import os
from typing import Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig
from crawl4ai.extraction_strategy import LLMExtractionStrategy
from urllib.parse import urlparse


# .envからAPIキーを読み込む
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")


# 出力スキーマを定義
class ShopInfo(BaseModel):
    name: str = Field(..., description="店舗名", examples="ブルーオーシャン沖縄店")
    description: str = Field(..., description="店舗紹介文")
    prefecture: Optional[str] = Field(None, description="都道府県", examples="沖縄県")
    address: Optional[str] = Field(
        None, description="住所", examples="沖縄県那覇市松山1-2-3"
    )
    city: Optional[str] = Field(
        None, description="市名", examples="那覇市"
    )
    location: Optional[str] = Field(
        None, description="ダイビングのロケーション", examples="石垣島"
    )
    phone: Optional[str] = Field(None, description="電話番号", examples="098-123-4567")
    email: Optional[str] = Field(
        None, description="メールアドレス", examples="example@gmail.com"
    )
    website: str = Field(
        None, description="公式WebサイトURL", examples="http://www.example.com"
    )
    image_url: Optional[str] = Field(
        None, description="代表画像URL", examples="http://www.example.com/image.jpg"
    )
    site_images: Optional[list] = Field(
        None,
        description="サイト内の画像URLリスト",
        examples=[
            "http://www.example.com/image1.jpg",
            "http://www.example.com/image2.jpg",
            "http://www.example.com/image3.jpg",
            "http://www.example.com/image4.jpg",
            "http://www.example.com/image5.jpg",
        ],
    )


# 関数定義
async def extract_shop_info(url: str) -> dict:
    instruction = """
    以下のWebページの内容から、ダイビングショップの基本情報を抽出してください。

    出力形式：
    {
        "name": "...",
        "description": "...",
        "prefecture": "...",
        "address": "...",
        "location": "...",
        "phone": "...",
        "email": "...",
        "website": "...",
        "image_url": "...",
        "site_images": ["...", "...", "...", "...", "..."]
    }

    抽出できない項目は null にしてください。
    """

    strategy = LLMExtractionStrategy(
        llm_config=LLMConfig(provider="openai/gpt-4.1-nano", api_token=openai_api_key),
        schema=ShopInfo.model_json_schema(),
        extraction_type="schema",
        instruction=instruction,
    )

    config = CrawlerRunConfig(
        exclude_external_links=True,
        word_count_threshold=30,
        extraction_strategy=strategy,
    )

    async with AsyncWebCrawler() as crawler:
        # breakpoint()
        result = await crawler.arun(url=url, config=config)
        content = json.loads(result.extracted_content)
        content[0]["website"] = url  # 明示的にURLを代入
    return content


def sanitize_filename(url: str) -> str:
    """
    URLからファイル名として安全な文字列を生成
    """
    parsed = urlparse(url)
    domain = parsed.netloc.replace(".", "_")
    path = parsed.path.strip("/").replace("/", "_") or "index"
    return f"{domain}_{path}.json"
