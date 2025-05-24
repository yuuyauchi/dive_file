import Image from "next/image"
import Link from "next/link"
import { SearchBox } from "@/components/search-box"
import { FeaturedCourses } from "@/components/featured-courses"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">あなたにぴったりのダイビングコースを見つけよう</h2>
          <p className="text-lg text-muted-foreground mb-8">
            全国のダイビングショップから最適なライセンスコースを簡単に比較・検索
          </p>
          <SearchBox className="max-w-2xl mx-auto" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">おすすめコース</h2>
          <FeaturedCourses />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">ダイビングの世界へようこそ</h2>
            <p className="text-lg mb-6">
              ダイビングは新しい世界への扉を開きます。美しい海の中で、色とりどりの魚や珊瑚礁に囲まれた体験は、一生の思い出になるでしょう。
            </p>
            <p className="text-lg mb-6">
              初めてのダイビングでも安心して楽しめるよう、経験豊富なインストラクターがサポートします。あなたのペースに合わせて、安全に楽しくダイビングを学べます。
            </p>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              コースを探す
            </Link>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="ダイビング体験" fill className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  )
}
