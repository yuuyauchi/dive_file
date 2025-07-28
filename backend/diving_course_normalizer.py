import openai
import os
from dotenv import load_dotenv
import json

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY")
client = openai.OpenAI(api_key=api_key)

# --- ダイビングコース/スペシャリティデータ（関数の外側） ---
diving_course_data = {
    "license": [
        "スクーバ・ダイバー",
        "オープン・ウォーター・ダイバー",
        "アドヴァンスド・オープン・ウォーター・ダイバー",
        "レスキュー・ダイバー",
        "マスター・スクーバ・ダイバー",
        "ダイブマスター",
        "アシスタント・インストラクター",
        "オープン・ウォーター・スクーバ・インストラクター",
        "マスター・スクーバ・ダイバー・トレーナー",
        "IDCスタッフ・インストラクター",
        "コース・ディレクター",
    ],
    "specialities": [
        "ピーク・パフォーマンス・ボイヤンシー (中性浮力)",
        "エンリッチド・エア・ダイバー",
        "ディープ・ダイバー",
        "水中ナビゲーター",
        "ナイト・ダイバー",
        "ドリフト・ダイバー",
        "ボート・ダイバー",
        "サーチ＆リカバリー・ダイバー",
        "デジタル水中フォトグラファー",
        "魚の見分け方",
        "レック・ダイバー (沈船)",
        "ドライスーツ・ダイバー",
        "高所ダイバー",
        "アイス・ダイバー (氷)",
        "キャバーン・ダイバー (洞窟)",
        "リブリーザー・ダイバー",
        "セルフ・リライアント・ダイバー",
    ],
}


def correct_diving_course_spelling(input_string, llm_client, course_name_list):
    """
    ダイビングのコースやスペシャリティの文字列の表記ゆれを修正します。

    Args:
        input_string (str): 修正対象のダイビングコースまたはスペシャリティの文字列。
        llm_client (openai.OpenAI): 初期化済みのOpenAIクライアントインスタンス。
        course_name_list (list): 参照する正規のコース/スペシャリティデータ。

    Returns:
        str: 修正された文字列。表記ゆれがない場合は元の文字列を返します。
             APIエラーが発生した場合は、元の文字列をそのまま返します。
    """

    if input_string in course_name_list:
        return input_string

    # プロンプトの準備
    # course_data_refを文字列に変換してプロンプトに含める

    prompt = f"""
    以下のダイビングコースとスペシャリティの正規リストがあります。

    {course_name_list}

    ユーザーが入力した以下の文字列は、上記のリストのいずれかの項目と表記ゆれしている可能性があります。
    表記ゆれしている場合、正規のリストの表記に修正し、json形式で出力してください。
    もし、リストのどの項目とも関連がない、または表記ゆれではないと判断される場合は、入力された文字列をそのまま返してください。

    入力文字列: "{input_string}"

    出力形式:
    {{
        "corrected_text": "修正された文字列"
    }}
    出力例:
    {{
        "corrected_text": "オープン・ウォーター・ダイバー"
    }}
    出力のキーは "corrected_text" のみで、他のキーは含めないでください。
    出力はJSON形式で、改行や空白は含めないでください
    """

    try:
        response = llm_client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {
                    "role": "system",
                    "content": "あなたはダイビングコースとスペシャリティの表記ゆれを修正するアシスタントです。",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.0,
            response_format={"type": "json_object"},
            max_tokens=100,
        )
        corrected_text = response.choices[0].message.content.strip()
        corrected_text = json.loads(corrected_text)["corrected_text"]
        return corrected_text
    except Exception as e:
        print(f"OpenAI API呼び出し中にエラーが発生しました: {e}")
        return input_string  # エラー時は元の文字列を返す


# 使用例
if __name__ == "__main__":
    print("--- 表記ゆれ修正テスト ---")
    if client:  # clientがNoneでない場合のみテストを実行
        test_strings = [
            "オープンウォーターダイバー",  # 表記ゆれ
            "アドバンスド・オープンウォーター・ダイバー",  # 表記ゆれ
            "中性浮力",  # 表記ゆれ（部分一致だが正規表現でなく意味で判断させる）
            "ディープダイバー",  # 表記ゆれ
            "スクーバ・ダイバー",  # 正規
            "ナイトロックス",  # 「エンリッチド・エア・ダイバー」の別名的な表記
            "水中写真",  # 「デジタル水中フォトグラファー」の別名的な表記
            "新しいコース",  # 関連なし
            "PADIオープン・ウォーター・ダイバー",  # PADIが付いているケース
            "アドヴァンスド",  # 部分的な表記
        ]

        for s in test_strings:
            corrected = correct_diving_course_spelling(s, client, diving_course_data)
            breakpoint()
            print(f"{corrected}")
    else:
        print(
            "OpenAIクライアントが初期化されていないため、テストを実行できません。APIキーが正しく設定されているか確認してください。"
        )
