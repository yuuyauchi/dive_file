import { SearchBox } from "@/components/search-box"
import { CourseList } from "@/components/course-list"
import { FilterSidebar } from "@/components/filter-sidebar"
import { getAllCourses } from "@/lib/data"

interface SearchPageProps {
  searchParams: {
    location?: string
    type?: string
    date?: string
    minPrice?: string
    maxPrice?: string
    level?: string
    sort?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  // 実際のアプリケーションではここでAPIからデータを取得します
  const courses = getAllCourses(searchParams)

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">コース検索結果</h1>
          <SearchBox className="mb-6" />

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar className="w-full lg:w-64 flex-shrink-0" />

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">{courses.length}件のコースが見つかりました</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">並び替え:</span>
                  <select className="border rounded p-1 text-sm">
                    <option value="recommended">おすすめ順</option>
                    <option value="price-asc">料金が安い順</option>
                    <option value="price-desc">料金が高い順</option>
                    <option value="rating-desc">評価が高い順</option>
                  </select>
                </div>
              </div>

              <CourseList courses={courses} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
