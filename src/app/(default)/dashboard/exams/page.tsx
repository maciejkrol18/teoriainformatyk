import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { ArrowUpLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import pl from 'dayjs/locale/pl'
import { declension } from '@/lib/utils'
import ExamHistoryTable from './table'
import getUser from '@/lib/supabase/get-user'

const RESULTS_PER_PAGE = 10

dayjs.locale(pl)

interface ExamHistoryPageProps {
  searchParams: ExamHistoryFilters
}

async function fetchPaginatedScores({
  user,
  page = '1',
  examId,
  sortBy = 'created_at',
  scoreLessThan,
  scoreMoreThan,
}: ExamHistoryFilters) {
  const supabase = createClient()

  const pageOffset = (Number.parseInt(page) - 1) * RESULTS_PER_PAGE

  const dbQuery = supabase
    .from('exam_scores')
    .select(
      'created_at, exam_id, user_id, score_id, percentage_score, correct, incorrect, unanswered, time_finished, time_started, exams (name)',
      { count: 'exact' },
    )
    .eq('user_id', user)
    .range(pageOffset, pageOffset + RESULTS_PER_PAGE - 1)
    .order(sortBy, { ascending: false })

  if (examId) {
    dbQuery.eq('exam_id', examId)
  }

  if (scoreLessThan) {
    dbQuery.lt('percentage_score', scoreLessThan)
  }

  if (scoreMoreThan) {
    dbQuery.gt('percentage_score', scoreMoreThan)
  }

  const { data, count, error } = await dbQuery

  if (error) throw new Error(error.message)
  if (!data) throw new Error('Nie udało się pobrać wyników egzaminów')
  return {
    data: data,
    count: count,
  }
}

export default async function ExamHistoryPage({ searchParams }: ExamHistoryPageProps) {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  const page = searchParams.page || '1'
  const examId = searchParams.examId
  const sortBy = searchParams.sortBy
  const scoreLessThan = searchParams.scoreLessThan
  const scoreMoreThan = searchParams.scoreMoreThan

  const { data, count } = await fetchPaginatedScores({
    user: user.id,
    page: page,
    examId: examId,
    sortBy: sortBy,
    scoreLessThan: scoreLessThan,
    scoreMoreThan: scoreMoreThan,
  })

  const totalPages = count ? Math.ceil(count / RESULTS_PER_PAGE) : 1
  const canNextPage = Number.parseInt(page) + 1 <= totalPages
  const canPrevPage = Number.parseInt(page) - 1 >= 1

  const processedExamHistory = data.map((score) => {
    const timeTook = dayjs(score.time_finished).diff(score.time_started, 'minute')
    return {
      ...score,
      created_at: dayjs(score.created_at).format('D MMMM YYYY, H[:]mm'),
      time_took: `${timeTook} ${declension(timeTook, 'minuta', 'minuty', 'minut')}`,
    }
  })

  return (
    <div className="flex flex-col gap-8">
      <Button asChild variant="outline" className="max-w-fit">
        <Link href="/dashboard">
          <ArrowUpLeft /> Wróć na stronę główną panelu
        </Link>
      </Button>
      <h1 className="text-4xl font-display">Historia egzaminów</h1>
      <ExamHistoryTable
        data={processedExamHistory}
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        pageNumber={Number.parseInt(page)}
        totalPages={totalPages}
      />
    </div>
  )
}
