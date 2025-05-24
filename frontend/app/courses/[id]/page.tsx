import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, MapPin, Calendar, Clock, Check, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseGallery } from "@/components/course-gallery"
import { RelatedCourses } from "@/components/related-courses"
import { getCourseById } from "@/lib/data"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/search"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          検索結果に戻る
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseGallery images={course.galleryImages} />

            <div className="mt-8">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-lg font-medium">{course.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{course.reviewCount}件のレビュー</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{course.level}</span>
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">コース内容</TabsTrigger>
                  <TabsTrigger value="schedule">スケジュール</TabsTrigger>
                  <TabsTrigger value="instructor">インストラクター</TabsTrigger>
                  <TabsTrigger value="reviews">レビュー</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-4">{course.fullDescription}</p>

                    <h3 className="text-xl font-bold mt-6 mb-4">コースに含まれるもの</h3>
                    <ul className="space-y-2">
                      {course.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-4">取得できる資格</h3>
                    <p>{course.certification}</p>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="mt-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-4">コーススケジュール</h3>
                    <div className="space-y-4">
                      {course.schedule.map((day, index) => (
                        <div key={index} className="border-b pb-4">
                          <h4 className="font-bold mb-2">{day.day}</h4>
                          <p>{day.activities}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="instructor" className="mt-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={course.instructor.image || "/placeholder.svg"}
                        alt={course.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{course.instructor.name}</h3>
                      <p className="text-muted-foreground mb-4">{course.instructor.title}</p>
                      <p>{course.instructor.bio}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-6">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={review.userImage || "/placeholder.svg"}
                              alt={review.userName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold">{review.userName}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <div className="sticky top-8 bg-white rounded-lg border p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-3xl font-bold">{course.price.toLocaleString()}円</span>
                <span className="text-muted-foreground">（税込）</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>ライセンス発行料込み</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>器材レンタル無料</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  <span>少人数制レッスン</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">予約する</Button>
                <Button variant="outline" className="w-full">
                  問い合わせる
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                今すぐ予約で、
                <Badge variant="outline" className="font-normal">
                  5%OFF
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">関連コース</h2>
          <RelatedCourses currentCourseId={course.id} />
        </div>
      </div>
    </main>
  )
}
