# -*- coding: utf-8 -*-
"""
merged_df.csvに、各コースの取得にかかる最低日数を追加するスクリプト。
プロジェクトのルートディレクトリから `python -m backend.scripts.add_min_days_to_csv` として実行してください。
"""
import pandas as pd
import json
import ast
import os

def add_min_days_to_courses(df: pd.DataFrame, course_description_path: str) -> pd.DataFrame:
    """
    DataFrameのcourse_list列に、コースの最低日数を追加する。

    Args:
        df (pd.DataFrame): 'course_list'列を含むDataFrame。
        course_description_path (str): コース情報が記載されたJSONファイルのパス。

    Returns:
        pd.DataFrame: 'min_days'が追加されたDataFrame。
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

    def _add_min_days_to_row(courses):
        if not isinstance(courses, list):
            return courses
        updated_courses = []
        for course in courses:
            if not isinstance(course, dict):
                updated_courses.append(course)
                continue
            
            updated_course = course.copy()
            course_name = updated_course.get("name")
            description = course_descriptions.get(course_name) if course_name else None
            updated_course["min_days"] = description.get("min_days") if description else None
            updated_courses.append(updated_course)
        return updated_courses

    if 'course_list' not in df.columns:
        print("❌ エラー: DataFrameに 'course_list' 列が見つかりません。")
        return df

    df['course_list'] = df['course_list'].apply(_add_min_days_to_row)
    print("✅ コース情報に最低日数を追加しました。")
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
    df_with_min_days = add_min_days_to_courses(df, course_description_path)
    df_with_min_days.to_csv(csv_path, index=False)
    print(f"💾 {csv_path} を更新しました。")

if __name__ == "__main__":
    main()