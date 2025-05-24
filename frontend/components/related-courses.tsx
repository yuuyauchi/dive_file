import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRelatedCourses } from "@/lib/data"

interface RelatedCoursesProps {
  currentCourseId: string
}

export function RelatedCourses({ currentCourseId }: RelatedCoursesProps) {
  const relatedCourses = getRelatedCourses(currentCourseId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedCourses.map((course) => (
        <Link href={`/courses/${course.id}`} key={course.id}>
          <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              {course.isPopular && <Badge className="absolute top-2 right-2 bg-primary">人気</Badge>}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{course.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{course.reviewCount}件のレビュー</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <div className="flex items-center text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                {course.location}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div>
                <span className="text-lg font-bold">{course.price.toLocaleString()}円</span>
                <span className="text-muted-foreground text-sm">（税込）</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
