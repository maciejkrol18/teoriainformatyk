import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database"
import { ExamScore } from "@/types/exam-score"
import { ArrowUpLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

const PAGINATION_OPTIONS = {
  limit: 10,
  offset: 0,
}

async function getExamHistory(user: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exam_scores")
    .select(
      "created_at, exam_id, user_id, percentage_score, correct, incorrect, unanswered, time_finished, time_started, exams (name)",
    )
    .eq("user_id", user)
    .range(
      PAGINATION_OPTIONS.offset,
      PAGINATION_OPTIONS.offset + PAGINATION_OPTIONS.limit - 1,
    )

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

  const examHistory = await getExamHistory(data.user.id)
  const totalScores = await getTotalAmountOfScores(data.user.id)

  const canNextPage = totalScores > PAGINATION_OPTIONS.limit * pageNumber
  const canPrevPage = pageNumber > 1
  const totalPages = Math.ceil(totalScores / PAGINATION_OPTIONS.limit)

  const processedExamHistory = examHistory.map((score) => {
    return {
      ...score,
      created_at: new Date(score.created_at).toLocaleDateString(),
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
      <p className="text-center">
        Strona {pageNumber} z {totalPages}
      </p>
    </div>
  )
}
