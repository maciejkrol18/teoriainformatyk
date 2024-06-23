import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DataTable } from "./DataTable"
import { columns } from "./columns"
import dayjs from "dayjs"
import pl from "dayjs/locale/pl"

const SCORES_PER_PAGE = 10

dayjs.locale(pl)

async function fetchPaginatedScores(user: string, pageOffset: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exam_scores")
    .select(
      "created_at, exam_id, user_id, percentage_score, correct, incorrect, unanswered, time_finished, time_started, exams (name)",
    )
    .eq("user_id", user)
    .range(pageOffset, pageOffset + SCORES_PER_PAGE - 1)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  } else if (!data) {
    throw new Error("Nie udało się pobrać wyników egzaminów")
  } else {
    return data
  }
}

async function getTotalAmountOfScores(user: string) {
  const supabase = createClient()

  const { count, error } = await supabase
    .from("exam_scores")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user)

  if (error) {
    throw new Error(error.message)
  } else {
    return count
  }
}

export default async function ExamHistoryPage({
  searchParams: { page = "1" },
}: {
  searchParams: {
    page: string
  }
}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  let pageNumber: number

  try {
    pageNumber = parseInt(page) || 1
  } catch {
    pageNumber = 1
  }
  const pageOffset = (pageNumber - 1) * SCORES_PER_PAGE

  const examHistory = await fetchPaginatedScores(data.user.id, pageOffset)
  const totalScores = await getTotalAmountOfScores(data.user.id)

  const totalPages = totalScores ? Math.ceil(totalScores / SCORES_PER_PAGE) : 1
  const canNextPage = pageNumber + 1 <= totalPages
  const canPrevPage = pageNumber - 1 >= 1

  const processedExamHistory = examHistory.map((score) => {
    return {
      ...score,
      created_at: dayjs(score.created_at).format("D MMMM YYYY, H[:]mm"),
      time_started: dayjs(score.time_started).format("H[:]mm[:]ss"),
      time_finished: dayjs(score.time_finished).format("H[:]mm[:]ss"),
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
      <DataTable columns={columns} data={processedExamHistory} />
      <div className="flex gap-4 justify-center items-center">
        <Button asChild variant="outline">
          <Link href={!canPrevPage ? "#" : `?page=${pageNumber - 1}`}>
            <ChevronLeft />
          </Link>
        </Button>
        <p className="text-center">
          Strona {pageNumber} z {totalPages}
        </p>
        <Button asChild variant="outline">
          <Link href={!canNextPage ? "#" : `?page=${pageNumber + 1}`}>
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
