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

const SCORES_PER_PAGE = 10

dayjs.locale(pl)

async function fetchPaginatedScores(user: string, pageOffset: number) {
  const supabase = createClient()

  const { data, count, error } = await supabase
    .from('exam_scores')
    .select(
      'created_at, exam_id, user_id, score_id, percentage_score, correct, incorrect, unanswered, time_finished, time_started, exams (name)',
      { count: 'exact' },
    )
    .eq('user_id', user)
    .range(pageOffset, pageOffset + SCORES_PER_PAGE - 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  } else if (!data) {
    throw new Error('Nie udało się pobrać wyników egzaminów')
  } else {
    return {
      data: data,
      count: count,
    }
  }
}

export default async function ExamHistoryPage({
  searchParams: { page = '1' },
}: {
  searchParams: {
    page: string
  }
}) {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  let pageNumber: number

  try {
    pageNumber = parseInt(page) || 1
  } catch {
    pageNumber = 1
  }
  const pageOffset = (pageNumber - 1) * SCORES_PER_PAGE

  const { data, count } = await fetchPaginatedScores(user.id, pageOffset)

  const totalPages = count ? Math.ceil(count / SCORES_PER_PAGE) : 1
  const canNextPage = pageNumber + 1 <= totalPages
  const canPrevPage = pageNumber - 1 >= 1

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
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </div>
  )
}
