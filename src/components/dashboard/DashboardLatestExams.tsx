"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useRef, useState } from "react"
import DashboardBlock from "./DashboardBlock"
import Link from "next/link"
import { Button } from "../ui/Button"
import { cn } from "@/lib/utils"

interface DashboardLatestExamsProps {
  userId: string
  className?: string
}

interface Score {
  exam_id: number
  correct: number
  incorrect: number
  unanswered: number
  created_at: string
}

const ScoreBlock = ({ exam_id, correct, incorrect, unanswered, created_at }: Score) => {
  const totalQuestions = correct + incorrect + unanswered
  const score = Math.floor((correct / totalQuestions) * 100)
  const date = new Date(created_at).toLocaleDateString()
  const exam =
    exam_id === 1
      ? "INF.02/EE.08"
      : exam_id === 2
        ? "INF.03/EE.09/EE.14"
        : "Nieznana kwalifikacja"
  const isScorePositive = score > 50

  return (
    <div
      className={cn(
        "flex justify-between items-center bg-background-bright p-2 border",
        isScorePositive ? "border-green-800" : "border-red-800",
      )}
    >
      <div>
        <p className="text-xl font-medium">{exam}</p>
        <p className="text-muted">{date}</p>
      </div>
      <p className="text-2xl font-medium">{score}%</p>
    </div>
  )
}

export default function DashboardLatestExams({
  userId,
  className,
}: DashboardLatestExamsProps) {
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const wereScoresFetched = useRef<boolean>(false)

  const fetchExamScores = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("exam_scores")
      .select("exam_id, correct, incorrect, unanswered, created_at")
      .eq("user_id", userId)
      .order("created_at")
      .limit(4)

    if (!data || error) {
      setLoading(false)
      setScores([])
    } else {
      setLoading(false)
      setScores(data)
      wereScoresFetched.current = true
    }
  }

  useEffect(() => {
    if (wereScoresFetched.current) return
    fetchExamScores()
  }, [])

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
      {loading && <p>Ładowanie...</p>}
      {scores.length > 0 &&
        scores.map((score, index) => {
          return (
            <ScoreBlock
              key={index}
              exam_id={score.exam_id}
              correct={score.correct}
              incorrect={score.incorrect}
              unanswered={score.unanswered}
              created_at={score.created_at}
            />
          )
        })}
      {scores.length === 0 && !loading && (
        <div className="flex justify-center items-center grow">
          <p className="text-muted">Brak wyników</p>
        </div>
      )}
    </DashboardBlock>
  )
}
