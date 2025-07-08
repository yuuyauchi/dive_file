import os
from supabase import create_client
from dotenv import load_dotenv
import pandas as pd
from typing import List, Optional

# import json
# import uuid

load_dotenv()
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

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


def add_diving_shops(
    data: List[dict],
) -> dict:
    df = pd.DataFrame(data)
    column_list = [
        "id",
        "name",
        "description",
        "location",
        "prefecture",
        "address",
        "email",
        "website",
        "image_url",
        "rating",
        "review_count",
    ]
    df = df[column_list]
    df.fillna("-", inplace=True)
    df.sort_values(by=["name"], inplace=True, ascending=False)
    df.drop_duplicates(subset=["name"], inplace=True)
    data = df.to_dict(orient="records")
    return insert_row("diving_shops", data)


def add_course_schedules(data: List) -> dict:
    pass


def add_course_reviews(data: List) -> dict:
    pass


def add_course_types(data: List) -> dict:
    df = pd.DataFrame(data)
    column_list = ["id", "name", "description", "level"]
    df = df[column_list]
    df.fillna("-", inplace=True)
    df.sort_values(by=["name"], inplace=True, ascending=False)
    df.drop_duplicates(subset=["name"], inplace=True)
    data = df.to_dict(orient="records")
    return insert_row("diving_shops", data)


def validate_data(data: List) -> List:
    pass
