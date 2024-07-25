import SearchBar from '@/components/search/SearchBar'
import SearchPagination from '@/components/search/SearchPagination'
import SearchResult from '@/components/search/SearchResult'
import { getHardCollection } from '@/lib/supabase/hard-collection'
import { createClient } from '@/lib/supabase/server'
import { SearchFilters } from '@/types/search-filters'

const RESULTS_PER_PAGE = 10

interface SearchPageProps {
  searchParams: SearchFilters
}

async function fetchPaginatedQuestions({
  query,
  page = '1',
  examId,
  sortBy = 'id',
  hasImage,
  hardOnly,
}: SearchFilters) {
  const supabase = createClient()

  const pageOffset = (parseInt(page) - 1) * RESULTS_PER_PAGE

  let dbQuery = supabase
    .from('questions')
    .select('id, content', { count: 'exact' })
    .range(pageOffset, pageOffset + RESULTS_PER_PAGE - 1)
    .order(sortBy)

  if (examId) {
    dbQuery.eq('exam_id', examId)
  }

  if (query) {
    dbQuery.textSearch('content', query, {
      type: 'websearch',
    })
  }

  if (hardOnly) {
    const hardCollection = (await getHardCollection()) ?? []
    dbQuery.in('id', hardCollection)
  }

  if (hasImage) {
    dbQuery.eq('image', hasImage)
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
  const page = searchParams.page || '1'
  const examId = searchParams.examId
  const sortBy = searchParams.sortBy
  const searchQuery = searchParams.query
  const hasImage = searchParams.hasImage
  const hardOnly = searchParams.hardOnly

  const { results, totalAmount } = await fetchPaginatedQuestions({
    query: searchQuery,
    page: page,
    examId: examId,
    sortBy: sortBy,
    hasImage: hasImage,
    hardOnly: hardOnly,
  })

  const totalPages = totalAmount ? Math.ceil(totalAmount / RESULTS_PER_PAGE) : 1

  return (
    <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
      <SearchBar examId={examId} sortBy={sortBy} hasImage={hasImage} />
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
