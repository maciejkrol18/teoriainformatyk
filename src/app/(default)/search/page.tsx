import SearchBar from "@/components/search/SearchBar"
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
    .select("*")
    .range(pageOffset, pageOffset + parseInt(limit) - 1)
    .order(sortBy)

  if (examId) {
    dbQuery = dbQuery.eq("exam_id", examId)
  }

  if (query) {
    dbQuery.textSearch("content", query)
  }

  if (hasImage) {
    dbQuery.eq("image", hasImage)
  }

  const { data, error } = await dbQuery

  if (error) {
    console.log(error)
  }

  return data
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const page = searchParams.page ?? 1
  const limit = searchParams.limit ?? 10
  const examId = searchParams.examId
  const sortBy = searchParams.sortBy
  const searchQuery = searchParams.query
  const hasImage = searchParams.hasImage

  const searchResults = await fetchPaginatedQuestions({
    query: searchQuery,
    page: page,
    limit: limit,
    examId: examId,
    sortBy: sortBy,
    hasImage: hasImage,
  })

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        query={searchQuery}
        examId={examId}
        sortBy={sortBy}
        hasImage={hasImage}
      />
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((question) => {
            return <SearchResult question={question} key={question.id} />
          })
        ) : (
          <p>Brak wyników dla twojego wyszukiwania</p>
        )}
      </div>
      {/* Pagination component */}
    </div>
  )
}
