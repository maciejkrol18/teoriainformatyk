import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database"
import { ExamScore } from "@/types/exam-score"
import { ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

const SCORES_PER_PAGE = 10

async function fetchPaginatedScores(user: string, pageOffset: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exam_scores")
    .select(
      "created_at, exam_id, user_id, percentage_score, correct, incorrect, unanswered, time_finished, time_started, exams (name)",
    )
    .eq("user_id", user)
    .range(pageOffset, pageOffset + SCORES_PER_PAGE - 1)

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
  } else if (!count) {
    throw new Error("Nie udało się pobrać liczby wyników")
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

  const totalPages = Math.ceil(totalScores / SCORES_PER_PAGE)
  const canNextPage = pageNumber + 1 <= totalPages
  const canPrevPage = pageNumber - 1 >= 1

  const processedExamHistory = examHistory.map((score) => {
    return {
      ...score,
      created_at: new Date(score.created_at).toLocaleDateString(),
      time_started: new Date(score.time_started).toLocaleTimeString(),
      time_finished: new Date(score.time_finished).toLocaleTimeString(),
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
      <p className="text-center text-muted">
        Wyświetlam {pageOffset + 1}-
        {pageOffset + SCORES_PER_PAGE > totalScores
          ? totalScores
          : pageOffset + SCORES_PER_PAGE}{" "}
        z {totalScores} wyników
      </p>
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
