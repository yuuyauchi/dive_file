# -*- coding: utf-8 -*-
"""
merged_df.csvのコース情報に、course_description.jsonから詳細情報を追加するスクリプト。
プロジェクトのルートディレクトリから `python -m backend.scripts.apply_course_description` として実行してください。
"""
import pandas as pd
import json
import ast
import os

def apply_course_description(df: pd.DataFrame, course_description_path: str) -> pd.DataFrame:
    """
    DataFrameのcourse_list列に、コースの最低日数と詳細説明を追加する。

    Args:
        df (pd.DataFrame): 'course_list'列を含むDataFrame。
        course_description_path (str): コース情報が記載されたJSONファイルのパス。

    Returns:
        pd.DataFrame: 'min_days'と'full_description'が追加されたDataFrame。
    """
    try:
        with open(course_description_path, "r", encoding="utf-8") as f:
            course_descriptions = json.load(f)
    except FileNotFoundError:
        print(f"⚠️  警告: {course_description_path} が見つかりませんでした。処理をスキップします。")
        return df
    except json.JSONDecodeError:
        print(f"❌ エラー: {course_description_path} のJSON形式が正しくありません。")
        return df

    def _add_details_to_row(courses):
        if not isinstance(courses, list):
            return courses
        updated_courses = []
        for course in courses:
            if not isinstance(course, dict):
                updated_courses.append(course)
                continue
            
            updated_course = course.copy()
            course_name = updated_course.get("name")
            description_data = course_descriptions.get(course_name) if course_name else None
            updated_course["min_days"] = description_data.get("min_days") if description_data else None
            updated_course["full_description"] = description_data.get("description") if description_data else None
            updated_courses.append(updated_course)
        return updated_courses

    if 'course_list' not in df.columns:
        print("❌ エラー: DataFrameに 'course_list' 列が見つかりません。")
        return df

    df['course_list'] = df['course_list'].apply(_add_details_to_row)
    print("✅ コース情報に最低日数と詳細説明を追加しました。")
    return df

def main():
    csv_path = "output/merged_df.csv"
    course_description_path = "backend/course_description.json"

    if not os.path.exists(csv_path):
        print(f"❌ エラー: {csv_path} が見つかりません。")
        return

    print(f"📄 {csv_path} を読み込んでいます...")
    converters = {
        'course_list': lambda x: ast.literal_eval(x) if isinstance(x, str) and x.strip().startswith('[') else [],
        'site_images': lambda x: ast.literal_eval(x) if isinstance(x, str) and x.strip().startswith('[') else []
    }
    df = pd.read_csv(csv_path, converters=converters)
    df_with_details = apply_course_description(df, course_description_path)
    df_with_details.to_csv(csv_path, index=False)
    print(f"💾 {csv_path} を更新しました。")

if __name__ == "__main__":
    main()