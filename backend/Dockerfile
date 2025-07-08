FROM python:3.11-slim-bullseye

# apt-get updateを一度実行し、よく使うツールをインストール
# slimイメージは軽量なため、必要なツールは自分でインストールします
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    sudo \
    git \
    openssh-client \
    vim \
    curl \
    wget \
    build-essential && \
    # 不要になったパッケージキャッシュを削除してイメージサイズを削減
    rm -rf /var/lib/apt/lists/*


# 作業ディレクトリを設定
WORKDIR /workspaces/blue_ocean
# COPY . /workspaces/blue_ocean/

# RUN pip install -r backend/requirements.txt
# RUN playwright install
# RUN playwright install-deps