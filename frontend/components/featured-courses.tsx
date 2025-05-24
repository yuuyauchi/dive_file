import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { featuredCourses } from "@/lib/data"

export function FeaturedCourses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredCourses.map((course) => (
        <Link href={`/courses/${course.id}`} key={course.id}>
          <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="relative h-60 w-full">
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
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="space-y-2">
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
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">{course.price.toLocaleString()}円</span>
                <span className="text-muted-foreground text-sm">（税込）</span>
              </div>
              <Badge variant="outline" className="text-primary">
                詳細を見る
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
