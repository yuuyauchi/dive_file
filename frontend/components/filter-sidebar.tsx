"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className = "" }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level])
    } else {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    }
  }

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setSelectedAreas([...selectedAreas, area])
    } else {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (selectedLevels.length > 0) {
      params.set("level", selectedLevels.join(","))
    } else {
      params.delete("level")
    }

    if (selectedAreas.length > 0) {
      params.set("area", selectedAreas.join(","))
    } else {
      params.delete("area")
    }

    router.push(`/search?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 200000])
    setSelectedLevels([])
    setSelectedAreas([])
    router.push("/search")
  }

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <h2 className="text-lg font-bold mb-4">絞り込み検索</h2>

      <Accordion type="multiple" defaultValue={["price", "level", "area"]}>
        <AccordionItem value="price">
          <AccordionTrigger>料金</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={200000} step={5000} onValueChange={setPriceRange} />
              <div className="flex justify-between">
                <span>{priceRange[0].toLocaleString()}円</span>
                <span>{priceRange[1].toLocaleString()}円</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger>レベル</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["初心者向け", "中級者向け", "上級者向け"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level}`}
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="area">
          <AccordionTrigger>エリア</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["沖縄", "伊豆", "小笠原", "慶良間", "石垣島"].map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={selectedAreas.includes(area)}
                    onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                  />
                  <label
                    htmlFor={`area-${area}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {area}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button onClick={applyFilters} className="w-full">
          適用する
        </Button>
        <Button variant="outline" onClick={resetFilters} className="w-full">
          リセット
        </Button>
      </div>
    </div>
  )
}
