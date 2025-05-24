import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/types"

interface CourseListProps {
  courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">検索条件に一致するコースが見つかりませんでした</h3>
        <p className="text-muted-foreground mb-6">検索条件を変更して、再度お試しください。</p>
        <Button variant="outline">すべてのコースを表示</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <Link href={`/courses/${course.id}`} key={course.id}>
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-60 md:h-auto md:w-1/3">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                {course.isPopular && <Badge className="absolute top-2 right-2 bg-primary">人気</Badge>}
              </div>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{course.reviewCount}件のレビュー</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{course.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {course.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    {course.level}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold">{course.price.toLocaleString()}円</span>
                    <span className="text-muted-foreground text-sm">（税込）</span>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    詳細を見る
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
