"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBoxProps {
  className?: string
}

export function SearchBox({ className = "" }: SearchBoxProps) {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [courseType, setCourseType] = useState("")
  const [date, setDate] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (location) params.append("location", location)
    if (courseType) params.append("type", courseType)
    if (date) params.append("date", date)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className={`rounded-xl border bg-card p-4 shadow-sm ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="エリア・都道府県"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <Select value={courseType} onValueChange={setCourseType}>
            <SelectTrigger>
              <SelectValue placeholder="コースタイプ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open-water">オープンウォーター</SelectItem>
              <SelectItem value="advanced">アドバンス</SelectItem>
              <SelectItem value="rescue">レスキュー</SelectItem>
              <SelectItem value="dive-master">ダイブマスター</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Input
            type="date"
            placeholder="日程"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1"
          />
        </div>

        <Button type="submit" className="w-full">
          <Search className="h-4 w-4 mr-2" />
          検索
        </Button>
      </div>
    </form>
  )
}
