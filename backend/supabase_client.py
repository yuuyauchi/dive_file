import os
from supabase import create_client, Client
from dotenv import load_dotenv
import pandas as pd
from typing import List, Optional
import json
import uuid

load_dotenv()
supabase_url = os.getenv("SUPABASE_API_URL")
supabase_key = os.getenv("SUPABASE_API_KEY")

supabase = create_client(supabase_url, supabase_key)

def fetch_all(table_name: str) -> List[dict]:
    response = supabase.table(table_name).select("*").execute()
    return response.data

def fetch_by_id(table_name: str, row_id: str) -> Optional[dict]:
    response = supabase.table(table_name).select("*").eq("id", row_id).maybe_single().execute()
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
        "address", "phone", "email", "website", "image_url",
        "rating", "review_count"
    ]
    # dfに存在するカラムのみを対象にする
    df_columns = [col for col in column_list if col in df.columns]
    df = df[df_columns]

    # 欠損値を適切に処理
    df.fillna(value={
        'description': '', 'address': '', 'phone': '', 'email': '',
        'website': '', 'image_url': '', 'location': '', 'prefecture': '',
        'rating': 0, 'review_count': 0
    }, inplace=True)

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
    df.rename(columns={'name': 'title'}, inplace=True)
    df.dropna(subset=['shop_id', 'title'], inplace=True)

    # DBスキーマに存在するカラムのみを対象とする
    db_columns = ['shop_id', 'title', 'price', 'level']
    df_columns = [col for col in db_columns if col in df.columns]
    data_to_upsert = df[df_columns].to_dict(orient='records')
    
    # shop_idとtitleの組み合わせでコンフリクトを判断
    return upsert_rows("diving_courses", data_to_upsert, on_conflict='shop_id,title')

