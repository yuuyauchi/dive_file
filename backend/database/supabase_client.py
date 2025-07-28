import os
from supabase import create_client
from dotenv import load_dotenv
import pandas as pd
from typing import List, Optional
import json
import uuid
import requests

load_dotenv()
supabase_url = os.getenv("SUPABASE_API_URL")
supabase_key = os.getenv("SUPABASE_API_KEY")

supabase = create_client(supabase_url, supabase_key)


def fetch_all(table_name: str) -> List[dict]:
    response = supabase.table(table_name).select("*").execute()
    return response.data


def fetch_by_id(table_name: str, row_id: str) -> Optional[dict]:
    response = (
        supabase.table(table_name).select("*").eq("id", row_id).maybe_single().execute()
    )
    return response.data


def insert_row(table_name: str, data: dict) -> dict:
    response = supabase.table(table_name).insert(data).execute()
    return response.data[0] if response.data else {}


def update_row(table_name: str, row_id: str, data: dict) -> dict:
    response = supabase.table(table_name).update(data).eq("id", row_id).execute()
    return response.data[0] if response.data else {}


def delete_row(table_name: str, row_id: str) -> dict:
    response = supabase.table(table_name).delete().eq("id", row_id).execute()
    return response.data[0] if response.data else {}

def upsert_rows(table_name: str, data: List[dict], on_conflict: str) -> List[dict]:
    """
    Supabaseテーブルにデータをupsert（insert or update）する。
    on_conflictで指定されたカラムが重複した場合に更新する。
    """
    if not data:
        return []
    response = supabase.table(table_name).upsert(data, on_conflict=on_conflict).execute()
    return response.data

def add_diving_shops(
    data: List[dict]
) -> List[dict]:
    """
    ショップ情報のリストをDBにupsertする。
    コース情報など、テーブルにないカラムは除外する。
    """
    df = pd.DataFrame(data)
    # DBスキーマに存在するカラムのみを選択
    column_list = [
        "id", "name", "description", "location", "prefecture",
        "city", "address", "phone", "email", "website", "image_url",
        "site_images", "rating", "review_count",
    ]
    # dfに存在するカラムのみを対象にする
    df_columns = [col for col in column_list if col in df.columns]
    df = df[df_columns]

    # 欠損値を適切に処理
    df.fillna(value={
        'description': '', 'address': '', 'phone': '', 'email': '',
        'website': '', 'image_url': '', 'location': '', 'prefecture': '', 'city': '',
        'rating': 0, 'review_count': 0
    }, inplace=True)

    # データ型を整形
    df['review_count'] = pd.to_numeric(df['review_count'], errors='coerce').fillna(0).astype(int)    

    data_to_upsert = df.to_dict(orient='records')
    # 'name' をコンフリクトのキーとしてupsertし、結果を返す
    return upsert_rows("diving_shops", data_to_upsert, on_conflict='name')

def add_diving_courses(data: List[dict]) -> List[dict]:
    """
    コース情報のリストをdiving_coursesテーブルにupsertする。
    """
    if not data:
        return []
    df = pd.DataFrame(data)
    # 必須カラムとデータ型を整形
    df['price'] = pd.to_numeric(df['price'], errors='coerce').fillna(0).astype(int)
    df['level'] = df['level'].fillna('unknown').astype(str)

    # min_daysカラムが存在する場合、Nullable Integerに変換
    if 'min_days' in df.columns:
        df['min_days'] = pd.to_numeric(df['min_days'], errors='coerce').astype('Int64')

    df.rename(columns={'name': 'title'}, inplace=True)
    df.dropna(subset=['shop_id', 'title'], inplace=True)

    # DBスキーマに存在するカラムのみを対象とする
    db_columns = ['shop_id', 'title', 'price', 'level', 'min_days']
    df_columns = [col for col in db_columns if col in df.columns]
    df_for_upsert = df[df_columns]

    # DataFrame内のNaNをNoneに置換してから辞書のリストに変換
    # これにより、'min_days'などの欠損値がNaN(JSON非互換)からNone(JSONのnull)に変換される
    data_to_upsert = df_for_upsert.where(pd.notna(df_for_upsert), None).to_dict(orient='records')
    
    
    # shop_idとtitleの組み合わせでコンフリクトを判断
    return upsert_rows("diving_courses", data_to_upsert, on_conflict='shop_id,title')

def upload_shop_image(shop_id: str, image_url: str, bucket_name: str = "shop-images") -> Optional[str]:
    """
    元の画像URLを元に、画像が未処理の場合のみStorageにアップロードし、imagesテーブルに記録する。

    Args:
        shop_id (str): 画像を紐付けるショップのUUID。
        image_url (str): ダウンロード対象の画像のURL（スクレイピング元のURL）。
        bucket_name (str, optional): アップロード先のSupabase Storageバケット名。
                                 デフォルトは "shop_images"。

    Returns:
        Optional[str]: 新しく画像がアップロードされた場合に、Supabase Storageの公開URLを返す。
                       URLが無効、処理済み、またはエラーの場合はNoneを返す。
    """
    if not image_url or not isinstance(image_url, str):
        return None

    try:
        # imagesテーブルで、同じショップIDと画像URLの組み合わせが既に存在するか確認
        query = supabase.table("images").select("public_url").eq("shop_id", shop_id).eq("original_url", image_url).maybe_single()
        response = query.execute()
        
        if response is not None and response.data:
            return None # 既に処理済みのため何もしない

        # 画像をダウンロード
        response = requests.get(image_url, stream=True, timeout=10)
        response.raise_for_status()
        image_data = response.content
        content_type = response.headers.get('Content-Type', 'image/jpeg')

        # 保存先のパスとファイル名を決定
        file_extension = image_url.split('.')[-1].split('?')[0] or 'jpg'
        storage_path = f"{shop_id}/{uuid.uuid4()}.{file_extension}"
        
        # Supabase Storageにアップロード
        supabase.storage.from_(bucket_name).upload(
            path=storage_path,
            file=image_data,
            file_options={"content-type": content_type}
        )
        print(f"  ✅ 画像を以下のパスにアップロードしました: {storage_path}")
        
        public_url = supabase.storage.from_(bucket_name).get_public_url(storage_path)
        
        # imagesテーブルにレコードを挿入
        image_record = {
            "shop_id": shop_id,
            "original_url": image_url,
            "storage_path": storage_path,
            "public_url": public_url
        }
        supabase.table("images").insert(image_record).execute()
        
        print(f"  ✅ imagesテーブルに記録しました: {public_url}")
        return public_url

    except requests.exceptions.RequestException as e:
        print(f"❌ 画像ダウンロードエラー (URL: {image_url}): {e}")
        return None
    except Exception as e:
        print(f"❌ 画像処理エラー (URL: {image_url}): {e}")
        return None
