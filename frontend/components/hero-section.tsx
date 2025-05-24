import Image from "next/image"
import { SearchBox } from "@/components/search-box"

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1200&width=2000"
          alt="美しい海の風景"
          fill
          priority
          className="object-cover brightness-[0.6]"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">あなたの冒険が、ここから始まる</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          全国のダイビングショップから最適なライセンスコースを見つけよう
        </p>
        <SearchBox className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20" />
      </div>
    </section>
  )
}
