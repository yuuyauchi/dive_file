import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">ページが見つかりません</h2>
      <p className="text-muted-foreground mb-8 max-w-md">お探しのページは存在しないか、移動した可能性があります。</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">ホームに戻る</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search">コースを探す</Link>
        </Button>
      </div>
    </div>
  )
}
