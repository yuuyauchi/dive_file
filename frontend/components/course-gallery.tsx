"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseGalleryProps {
  images: string[]
}

export function CourseGallery({ images }: CourseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="space-y-2">
      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image src={images[activeIndex] || "/placeholder.svg"} alt="コース画像" fill className="object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 hover:text-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">前の画像</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 hover:text-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">次の画像</span>
        </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden transition-all ${
              activeIndex === index ? "ring-2 ring-primary" : "opacity-70"
            }`}
            onClick={() => goToImage(index)}
          >
            <Image src={image || "/placeholder.svg"} alt={`サムネイル ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
