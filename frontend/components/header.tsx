import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image src="/placeholder.svg?height=32&width=32" alt="ロゴ" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold">DivingLicense</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            ホーム
          </Link>
          <Link href="/search" className="text-sm font-medium transition-colors hover:text-primary">
            コース検索
          </Link>
          <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
            ショップ一覧
          </Link>
          <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
            ダイビング情報
          </Link>
          <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
            よくある質問
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="#" className="hidden md:inline-flex">
            <Button variant="outline">ログイン</Button>
          </Link>
          <Link href="#" className="hidden md:inline-flex">
            <Button>会員登録</Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  ホーム
                </Link>
                <Link href="/search" className="text-lg font-medium transition-colors hover:text-primary">
                  コース検索
                </Link>
                <Link href="#" className="text-lg font-medium transition-colors hover:text-primary">
                  ショップ一覧
                </Link>
                <Link href="#" className="text-lg font-medium transition-colors hover:text-primary">
                  ダイビング情報
                </Link>
                <Link href="#" className="text-lg font-medium transition-colors hover:text-primary">
                  よくある質問
                </Link>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    ログイン
                  </Button>
                  <Button className="w-full">会員登録</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
