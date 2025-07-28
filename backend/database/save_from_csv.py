# -*- coding: utf-8 -*-
"""
CSVファイル→データベースへの保存処理を実行するスクリプト。
プロジェクトのルートディレクトリから `python -m backend.database.save_from_csv` として実行してください。
"""
from .database_handler import load_and_save_from_csv


def main():
    """
    output/merged_df.csv を読み込んでDBに保存する
    """
    # スクリプトがルートから実行されるため、パスはプロジェクトルートからの相対パス
    csv_path = "output/merged_df.csv"
    print(f"Attempting to load data from: {csv_path}")
    load_and_save_from_csv(csv_path)


if __name__ == "__main__":
    main()
