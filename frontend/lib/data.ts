import type { Course } from "./types"

// ダミーデータ
export const featuredCourses: Course[] = [
  {
    id: "1",
    title: "オープンウォーターダイバーコース",
    description: "初めての方向けの基本的なダイビングライセンスコース。美しい沖縄の海で安全なダイビングを学びましょう。",
    fullDescription:
      "オープンウォーターダイバーコースは、ダイビングの基本を学ぶ入門コースです。このコースでは、ダイビングの基礎知識、器材の使い方、水中での呼吸法、安全対策など、ダイビングに必要な基本スキルを習得します。講習は、プール練習と海洋実習で構成されており、段階的に技術を身につけることができます。沖縄の美しい海で、経験豊富なインストラクターが丁寧に指導します。コース修了後は、世界中で通用するCカードを取得でき、水深18mまでのダイビングを楽しむことができます。",
    image: "/placeholder.svg?height=600&width=800",
    galleryImages: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    price: 65000,
    location: "沖縄・恩納村",
    duration: "3日間",
    level: "初心者向け",
    rating: 4.8,
    reviewCount: 124,
    isPopular: true,
    includes: ["教材費（テキスト、DVD）", "器材レンタル料", "プール講習料", "海洋実習料", "ライセンス申請料", "保険料"],
    certification: "PADIオープンウォーターダイバーライセンス（Cカード）",
    schedule: [
      {
        day: "1日目",
        activities: "学科講習（ダイビングの基礎知識、器材の使い方、安全対策など）、プール講習（基本スキルの練習）",
      },
      {
        day: "2日目",
        activities: "海洋実習1回目（浅い海でのスキル練習）、海洋実習2回目（少し深い場所でのダイビング体験）",
      },
      {
        day: "3日目",
        activities: "海洋実習3回目（様々な環境でのダイビング）、海洋実習4回目（総合的なスキルの確認）、修了式",
      },
    ],
    instructor: {
      name: "山田太郎",
      title: "PADIコースディレクター",
      bio: "ダイビング歴15年、インストラクター歴10年。世界中の海でダイビングを楽しみ、1000人以上の生徒を指導してきました。安全で楽しいダイビングをモットーに、一人ひとりに合わせた丁寧な指導を心がけています。",
      image: "/placeholder.svg?height=200&width=200",
    },
    reviews: [
      {
        userName: "佐藤健太",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023年8月15日",
        comment:
          "初めてのダイビングでしたが、丁寧な指導のおかげで安心して学ぶことができました。沖縄の海の美しさに感動し、ダイビングの魅力にすっかりはまってしまいました。",
      },
      {
        userName: "鈴木美咲",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023年7月23日",
        comment:
          "インストラクターの方がとても親切で、分かりやすく教えてくれました。少し天候が悪かったのが残念でしたが、それでも素晴らしい体験ができました。",
      },
      {
        userName: "田中雄太",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023年6月10日",
        comment:
          "家族で参加しましたが、子供たちも含めて全員が楽しめました。安全面への配慮も徹底していて、安心して任せることができました。また参加したいです。",
      },
    ],
  },
  {
    id: "2",
    title: "アドバンスドオープンウォーターダイバーコース",
    description:
      "より深い水深でのダイビングや、ナイトダイビングなど、さまざまなスペシャルティを学べる上級者向けコース。",
    fullDescription:
      "アドバンスドオープンウォーターダイバーコースは、オープンウォーターダイバーの次のステップとして、より高度なダイビングスキルを習得するためのコースです。このコースでは、ディープダイビング、ナビゲーション、ナイトダイビングなど、5つの異なるスペシャルティダイビングを体験します。水深30mまでのダイビングが可能になり、より多様な海洋環境でのダイビングを楽しむことができるようになります。伊豆の美しい海で、経験豊富なインストラクターが丁寧に指導します。",
    image: "/placeholder.svg?height=600&width=800",
    galleryImages: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    price: 75000,
    location: "伊豆・大瀬崎",
    duration: "2日間",
    level: "中級者向け",
    rating: 4.7,
    reviewCount: 89,
    isPopular: false,
    includes: ["教材費（テキスト、DVD）", "器材レンタル料", "5回の海洋実習料", "ライセンス申請料", "保険料"],
    certification: "PADIアドバンスドオープンウォーターダイバーライセンス",
    schedule: [
      {
        day: "1日目",
        activities:
          "学科講習（各スペシャルティの知識）、海洋実習1回目（ディープダイビング）、海洋実習2回目（ナビゲーション）、海洋実習3回目（ナイトダイビング）",
      },
      {
        day: "2日目",
        activities: "海洋実習4回目（中性浮力）、海洋実習5回目（水中写真）、修了式",
      },
    ],
    instructor: {
      name: "鈴木一郎",
      title: "PADIマスターインストラクター",
      bio: "ダイビング歴20年、インストラクター歴15年。世界中の海でダイビングを楽しみ、特に水中写真に造詣が深い。丁寧な指導と安全管理に定評があり、多くのリピーターに支持されています。",
      image: "/placeholder.svg?height=200&width=200",
    },
    reviews: [
      {
        userName: "高橋直人",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023年9月5日",
        comment:
          "オープンウォーターの次のステップとして参加しました。ナイトダイビングが特に印象的で、昼間とは全く違う海の世界を体験できました。インストラクターの知識も豊富で、多くのことを学べました。",
      },
      {
        userName: "渡辺真理",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 4,
        date: "2023年8月20日",
        comment:
          "水中ナビゲーションが難しかったですが、丁寧に教えてもらえたので習得できました。伊豆の海の透明度も高く、素晴らしい体験でした。",
      },
    ],
  },
  {
    id: "3",
    title: "レスキューダイバーコース",
    description: "緊急時の対応や救助方法を学ぶ、安全意識の高いダイバーのためのコース。ダイビングの安全性を高めます。",
    fullDescription:
      "レスキューダイバーコースは、ダイビング中の緊急事態に対応するための知識とスキルを習得するコースです。自己救助、バディレスキュー、パニック対応、応急処置など、ダイビングの安全性を高めるための様々な技術を学びます。このコースを修了することで、より責任感のあるダイバーとして、自分自身だけでなく、他のダイバーの安全も確保できるようになります。小笠原の美しい海で、経験豊富なインストラクターが丁寧に指導します。",
    image: "/placeholder.svg?height=600&width=800",
    galleryImages: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    price: 85000,
    location: "小笠原・父島",
    duration: "3日間",
    level: "中級者向け",
    rating: 4.9,
    reviewCount: 56,
    isPopular: true,
    includes: [
      "教材費（テキスト、DVD）",
      "器材レンタル料",
      "プール講習料",
      "海洋実習料",
      "ライセンス申請料",
      "保険料",
      "応急処置（EFR）コース料金",
    ],
    certification: "PADIレスキューダイバーライセンス、EFR（応急処置）ライセンス",
    schedule: [
      {
        day: "1日目",
        activities: "学科講習（緊急事態の認識と対応、救助技術の理論）、EFR（応急処置）コース",
      },
      {
        day: "2日目",
        activities:
          "プール講習（レスキュー技術の練習）、海洋実習1回目（自己救助技術）、海洋実習2回目（バディレスキュー）",
      },
      {
        day: "3日目",
        activities:
          "海洋実習3回目（パニックダイバーの対応）、海洋実習4回目（意識不明ダイバーの救助）、シナリオ訓練、修了式",
      },
    ],
    instructor: {
      name: "佐藤美香",
      title: "PADIスタッフインストラクター",
      bio: "ダイビング歴18年、インストラクター歴12年。元看護師の経験を活かし、安全管理と緊急対応に特化した指導を行っています。多くのレスキューダイバーを育成し、その実践的な指導方法に定評があります。",
      image: "/placeholder.svg?height=200&width=200",
    },
    reviews: [
      {
        userName: "中村健太郎",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023年7月15日",
        comment:
          "実践的な内容で、本当に役立つスキルを学ぶことができました。インストラクターの経験に基づいた指導は非常に説得力があり、安全に対する意識が大きく変わりました。",
      },
      {
        userName: "小林由美",
        userImage: "/placeholder.svg?height=100&width=100",
        rating: 5,
        date: "2023年6月30日",
        comment:
          "ダイビングの楽しさだけでなく、責任についても深く考えさせられるコースでした。実際のシナリオ訓練は緊張しましたが、とても良い経験になりました。",
      },
    ],
  },
]

// すべてのコースを取得する関数
export function getAllCourses(filters?: any): Course[] {
  // 実際のアプリケーションではここでフィルタリングを行います
  return [
    ...featuredCourses,
    {
      id: "4",
      title: "ダイブマスターコース",
      description:
        "プロへの第一歩。ダイビングのリーダーシップスキルを身につけ、ダイビングプロフェッショナルを目指す方向けのコース。",
      fullDescription:
        "ダイブマスターコースは、レクリエーショナルダイビングの最高ランクであり、プロフェッショナルへの第一歩となるコースです。このコースでは、ダイビングの知識とスキルを深めるだけでなく、他のダイバーをリードし、サポートするための能力を養います。ダイビングの理論、スキル開発、リスク管理、ダイビングビジネスの基礎など、幅広い内容を学びます。石垣島の多様な海洋環境で、経験豊富なインストラクターが丁寧に指導します。",
      image: "/placeholder.svg?height=600&width=800",
      galleryImages: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      price: 180000,
      location: "石垣島",
      duration: "2週間",
      level: "上級者向け",
      rating: 4.8,
      reviewCount: 32,
      isPopular: false,
      includes: [
        "教材費（テキスト、DVD）",
        "器材レンタル料",
        "プール講習料",
        "海洋実習料",
        "ライセンス申請料",
        "保険料",
      ],
      certification: "PADIダイブマスターライセンス",
      schedule: [
        {
          day: "第1週",
          activities:
            "学科講習（ダイビング理論の復習、リスク管理、ダイビングビジネスの基礎）、水中スキルの開発、ダイビングマネジメントワークショップ",
        },
        {
          day: "第2週",
          activities:
            "実践的なトレーニング（ダイビングガイド実習、ダイビング監督実習、教育支援実習）、最終評価、修了式",
        },
      ],
      instructor: {
        name: "田中誠",
        title: "PADIコースディレクター",
        bio: "ダイビング歴25年、インストラクター歴18年。世界中の海でダイビングを楽しみ、多くのダイビングプロフェッショナルを育成してきました。石垣島を拠点に、その豊かな海洋環境を活かした指導を行っています。",
        image: "/placeholder.svg?height=200&width=200",
      },
      reviews: [
        {
          userName: "伊藤大輔",
          userImage: "/placeholder.svg?height=100&width=100",
          rating: 5,
          date: "2023年5月20日",
          comment:
            "長期間のコースでしたが、毎日新しい発見があり、充実した時間を過ごせました。インストラクターの経験に基づいた指導は非常に参考になり、ダイビングに対する見方が大きく変わりました。",
        },
        {
          userName: "山本さやか",
          userImage: "/placeholder.svg?height=100&width=100",
          rating: 4,
          date: "2023年4月15日",
          comment:
            "プロを目指す上で必要な知識とスキルを体系的に学ぶことができました。特に実践的なガイド実習は、実際の仕事をイメージするのに役立ちました。",
        },
      ],
    },
    {
      id: "5",
      title: "体験ダイビング",
      description:
        "ライセンスがなくても参加できる、海の世界を体験できるプログラム。美しい慶良間の海で、安全に楽しくダイビングを体験。",
      fullDescription:
        "体験ダイビングは、ダイビングライセンスを持っていない方でも、美しい海の世界を体験できるプログラムです。経験豊富なインストラクターが1対1で付き添い、安全に楽しくダイビングを体験できます。慶良間諸島の透明度の高い海で、カラフルな魚や珊瑚礁を間近で観察する感動を味わってください。事前の泳力テストは不要で、8歳以上であれば参加可能です。ダイビングに興味はあるけれど、ライセンス取得は迷っているという方にもおすすめのプログラムです。",
      image: "/placeholder.svg?height=600&width=800",
      galleryImages: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      price: 15000,
      location: "慶良間諸島",
      duration: "半日",
      level: "初心者向け",
      rating: 4.9,
      reviewCount: 215,
      isPopular: true,
      includes: ["器材レンタル料", "ボート乗船料", "保険料", "インストラクター料", "写真撮影サービス"],
      certification: "なし（体験プログラムのため）",
      schedule: [
        {
          day: "当日",
          activities:
            "受付・説明（ダイビングの基本、安全対策、器材の使い方）、器材装着、浅瀬での練習、ボートでポイントへ移動、体験ダイビング（約30分）、ボートで帰港、シャワー・着替え、写真・動画の閲覧",
        },
      ],
      instructor: {
        name: "中島裕子",
        title: "PADIインストラクター",
        bio: "ダイビング歴12年、インストラクター歴8年。特に初心者への指導に定評があり、安心して海を楽しめるよう丁寧にサポートします。慶良間の海の魅力を伝えることをモットーに、多くの方にダイビングの素晴らしさを伝えています。",
        image: "/placeholder.svg?height=200&width=200",
      },
      reviews: [
        {
          userName: "加藤雄一",
          userImage: "/placeholder.svg?height=100&width=100",
          rating: 5,
          date: "2023年9月10日",
          comment:
            "初めてのダイビングでしたが、インストラクターの方が丁寧に教えてくれたので安心して楽しめました。慶良間の海の美しさに感動し、次回はライセンス取得にも挑戦したいと思います。",
        },
        {
          userName: "松本さくら",
          userImage: "/placeholder.svg?height=100&width=100",
          rating: 5,
          date: "2023年8月25日",
          comment:
            "家族で参加しましたが、子供たちも含めて全員が大満足でした。水中写真も素晴らしく、良い思い出になりました。インストラクターの方の説明も分かりやすく、安心して体験できました。",
        },
        {
          userName: "井上拓也",
          userImage: "/placeholder.svg?height=100&width=100",
          rating: 4,
          date: "2023年8月5日",
          comment:
            "透明度の高い海で、カラフルな魚や珊瑚を間近で見ることができて感動しました。もう少し長く潜りたかったですが、初心者には丁度良い時間だったかもしれません。",
        },
      ],
    },
  ]
}

// コースIDからコースを取得する関数
export function getCourseById(id: string): Course | undefined {
  return getAllCourses().find((course) => course.id === id)
}

// 関連コースを取得する関数
export function getRelatedCourses(currentId: string): Course[] {
  // 実際のアプリケーションでは、タグやカテゴリなどに基づいて関連コースを取得します
  return getAllCourses()
    .filter((course) => course.id !== currentId)
    .slice(0, 4)
}
