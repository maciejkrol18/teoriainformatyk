import { createClient } from "@/lib/supabase/server"
import DashboardBlock from "./DashboardBlock"
import Link from "next/link"
import { Button } from "../ui/Button"
import ScoreBlock from "../ui/ScoreBlock"

interface DashboardLatestExamsProps {
  userId: string
  className?: string
}

interface Score {
  exam_id: number | null
  percentage_score: number
  created_at: string
  exams: {
    name: string
  } | null
}

export default async function DashboardLatestExams({
  userId,
  className,
}: DashboardLatestExamsProps) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("exam_scores")
    .select("exam_id, percentage_score, created_at, exams (name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(4)

  let scores: Score[] = []

  if (data) {
    scores = [...scores, ...data]
  }

  return (
    <DashboardBlock
      blockTitle="Ostatnie egzaminy"
      className={className}
      blockActions={
        <Button variant="primary" size="sm" asChild>
          <Link href="/dashboard/exams">Zobacz wszystkie</Link>
        </Button>
      }
    >
      {scores.length > 0 &&
        scores.map((score, index) => {
          return (
            <ScoreBlock
              key={index}
              examName={score.exams?.name}
              percentageScore={score.percentage_score}
              createdAt={score.created_at}
            />
          )
        })}
      {scores.length === 0 && (
        <div className="flex justify-center items-center grow">
          <p className="text-muted">Brak wyników</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center grow">
          <p className="text-muted">
            Wystąpił błąd podczas pobierania danych <br /> {error.message}
          </p>
        </div>
      )}
    </DashboardBlock>
  )
}
