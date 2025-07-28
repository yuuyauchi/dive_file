import os

import googlemaps
from dotenv import load_dotenv

load_dotenv()

# ==== 設定 ====
google_api_key = os.getenv("GOOGLE_API_KEY")
query = "スクーバサポートサービスTRYS"  # 検索キーワード
language_code = "ja"  # 日本語を指定

# ==== クライアントの初期化 ====
gmaps = googlemaps.Client(key=google_api_key)


def get_place_details(query: str, language_code: str = "ja"):
    """
    指定されたクエリでGoogle Mapsから場所の詳細を取得する関数。

    :param query: 検索キーワード
    """
    # ① Place ID を取得
    search_result = gmaps.find_place(
        input=query,
        input_type="textquery",
        fields=["place_id", "name"],
        language=language_code,
    )

    if search_result.get("status") == "OK" and search_result.get("candidates"):
        place_id = search_result["candidates"][0]["place_id"]
        print(
            f"[Place ID 取得成功] {search_result['candidates'][0]['name']} - {place_id}"
        )
    else:
        print("[Place ID 取得失敗]", search_result.get("status"))
        return None
    return place_id


def get_reviews(query: str, language_code: str = "ja"):
    """
    指定されたPlace IDでGoogle Mapsから場所の詳細と口コミを取得する関数。
    :param query: 検索キーワード
    :param language_code: 言語コード（デフォルトは日本語）
    :return: 取得した場所の詳細と口コミ
    """
    place_id = get_place_details(query, language_code)
    if not place_id:
        return
    # ② 詳細情報を取得
    details_result = gmaps.place(
        place_id=place_id,
        fields=["name", "url", "reviews", "rating", "user_ratings_total"],
        language=language_code,
    )
    rating = details_result["result"]["rating"]
    review_count = details_result["result"]["user_ratings_total"]

    if details_result.get("status") == "OK":
        result = details_result.get("result", {})
        # name = result.get("name", "名称なし")
        # url = result.get("url", "URLなし")
        reviews = result.get("reviews", [])
        review_list = []
        for i, review in enumerate(reviews[:10]):
            author = review.get("author_name", "匿名")
            rating = review.get("rating", "N/A")
            text = review.get("text", "レビュー内容なし")
            review_list.append(
                {
                    "author": author,
                    "text": text,
                }
            )
        review_dict = {
            "reviews": review_list,
            "rating": rating,
            "review_count": review_count,
        }
        return review_dict
    else:
        print("[詳細情報取得失敗]", details_result.get("status"))
        return


# review_list = get_reviews(query, language_code)
# breakpoint()
