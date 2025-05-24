import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative h-8 w-8">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="ロゴ"
                  fill
                  className="object-contain brightness-200"
                />
              </div>
              <span className="text-xl font-bold">DivingLicense</span>
            </Link>
            <p className="text-slate-400 mb-4">
              全国のダイビングショップのライセンス取得コースを簡単に比較できるWebサービス。初心者から上級者まで、あなたにぴったりのコースが見つかります。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-slate-400 hover:text-white">
                  コース検索
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ショップ一覧
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ダイビングスポット
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ライセンス比較
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ダイビング器材
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ダイビング入門ガイド
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  安全ガイドライン
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  ダイビングブログ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  用語集
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} DivingLicense All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
