FROM python:3.11-slim-bullseye

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
