import pandas as pd
import ast
from .supabase_client import add_diving_shops, add_diving_courses, upload_shop_image

def save_to_db(merged_df: pd.DataFrame):
    """
    マージされたダイビングショップのDataFrameをデータベースに保存する。

    Args:
        merged_df (pd.DataFrame): 保存するショップ情報とコース情報を含むDataFrame。
    """
    print("\n💾 データベースへの保存を開始します...")
    try:       
        # 1. ショップ情報をDBに保存
        # course_listはDBスキーマにないので除外
        shops_to_save = merged_df.drop(columns=['course_list'], errors='ignore').to_dict('records')
        print(f"  -> {len(shops_to_save)}件のショップ情報をupsertします。")
        db_shops_result = add_diving_shops(shops_to_save)
        print(f"  ✅ {len(db_shops_result)}件のショップ情報がDBに保存/更新されました。")

        # ※リリース初期は、ショップの画像URLをそのままフロントエンドで使用する。そのためストレージには保存しない。
        # 2. ショップ画像の処理 
        # print("\n🖼️ ショップ画像の処理を開始します...")
        # for shop in db_shops_result:
        #     image_url = shop.get('image_url')
        #     # image_urlが有効な場合にのみ処理を実行
        #     if image_url and image_url.startswith(('http', 'https')):
        #         upload_shop_image(shop_id=shop['id'], image_url=image_url)

        # 3. コース情報にshop_idを紐付け
        # DBから返された結果には最新のIDが含まれている
        db_shops_df = pd.DataFrame(db_shops_result)[['id', 'name']]
        db_shops_df.rename(columns={'id': 'shop_id'}, inplace=True)

        # 元のデータとDBから返ってきたデータをマージしてshop_idを取得
        courses_df = merged_df[['name', 'course_list']].copy()
        courses_df = pd.merge(courses_df, db_shops_df, on='name', how='left')

        all_courses = []
        for _, row in courses_df.iterrows():
            if pd.notna(row['shop_id']) and isinstance(row['course_list'], list):
                for course in row['course_list']:
                    if isinstance(course, dict):
                        course['shop_id'] = row['shop_id']
                        all_courses.append(course)

        # 4. コース情報をDBに保存
        if all_courses:
            print(f"  -> {len(all_courses)}件のコース情報をupsertします。")
            db_courses_result = add_diving_courses(all_courses)
            print(f"  ✅ {len(db_courses_result)}件のコース情報がDBに保存/更新されました。")
    except Exception as e:
        print(f"❌ データベース保存中にエラーが発生しました: {e}")

def load_and_save_from_csv(file_path: str):
    """
    CSVファイルを読み込み、データベースに保存する。

    Args:
        file_path (str): 読み込むCSVファイルのパス。
    """
    print(f"📄 {file_path} からデータを読み込んでいます...")
    try:
        # CSVを読み込む際に、リストとして保存されている列を適切に変換する
        converters = {
            'course_list': lambda x: ast.literal_eval(x) if isinstance(x, str) and x.strip().startswith('[') and x.strip().endswith(']') else [],
            'site_images': lambda x: ast.literal_eval(x) if isinstance(x, str) and x.strip().startswith('[') and x.strip().endswith(']') else []
        }
        df = pd.read_csv(file_path, converters=converters)
        save_to_db(df)
    except FileNotFoundError:
        print(f"❌ ファイルが見つかりません: {file_path}")
    except Exception as e:
        print(f"❌ CSVファイルの読み込みまたは処理中にエラーが発生しました: {e}")


