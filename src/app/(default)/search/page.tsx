import SearchBar from "@/components/search/SearchBar"
import SearchPagination from "@/components/search/SearchPagination"
import SearchResult from "@/components/search/SearchResult"
import { createClient } from "@/lib/supabase/server"
import { SearchFilters } from "@/types/search-filters"

interface SearchPageProps {
  searchParams: SearchFilters
}

async function fetchPaginatedQuestions({
  query,
  page = "1",
  limit = "10",
  examId,
  sortBy = "id",
  hasImage,
}: SearchFilters) {
  const supabase = createClient()

  const pageOffset = (parseInt(page) - 1) * parseInt(limit)

  let dbQuery = supabase
    .from("questions")
    .select("*", { count: "exact" })
    .range(pageOffset, pageOffset + parseInt(limit) - 1)
    .order(sortBy)

  if (examId) {
    dbQuery.eq("exam_id", examId)
  }

  if (query) {
    dbQuery.textSearch("content", query, {
      type: "websearch",
    })
  }

  if (hasImage) {
    dbQuery.eq("image", hasImage)
  }

  const { data, count, error } = await dbQuery

  if (error) {
    console.log(error)
  }

  return {
    results: data,
    totalAmount: count,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const page = searchParams.page ?? 1
  const limit = searchParams.limit ?? 10
  const examId = searchParams.examId
  const sortBy = searchParams.sortBy
  const searchQuery = searchParams.query
  const hasImage = searchParams.hasImage

  const { results, totalAmount } = await fetchPaginatedQuestions({
    query: searchQuery,
    page: page,
    limit: limit,
    examId: examId,
    sortBy: sortBy,
    hasImage: hasImage,
  })

  const totalPages = totalAmount ? Math.ceil(totalAmount / parseInt(limit)) : 1

  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <SearchBar
        query={searchQuery}
        examId={examId}
        sortBy={sortBy}
        hasImage={hasImage}
      />
      <div className="flex flex-col gap-4">
        {results && results.length > 0 ? (
          results.map((question) => {
            return <SearchResult question={question} key={question.id} />
          })
        ) : (
          <p className="text-muted text-center">Brak wyników dla twojego wyszukiwania</p>
        )}
      </div>
      <SearchPagination page={parseInt(page)} totalPages={totalPages} />
    </div>
  )
}
