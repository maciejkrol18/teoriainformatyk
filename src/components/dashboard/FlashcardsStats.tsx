"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useRef, useState } from "react"
import Donut from "../ui/Donut"

interface FlashcardsStats {
  userId: string
  examId: number
}

type FinishedQuestions = number | null

export default function FlashcardsStats({ userId, examId }: FlashcardsStats) {
  const [finishedQuestions, setFinishedQuestions] = useState<FinishedQuestions>(null)
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null)
  const [scorePercentage, setScorePercentage] = useState<number>(0)

  const [loading, setLoading] = useState(true)
  const wereStatsFetched = useRef<boolean>(false)

  const fetchFlashcardsStats = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("flashcards")
      .select("question_id_array")
      .eq("user_id", userId)
      .eq("exam_id", examId)
      .single()

    if (error || !data.question_id_array) {
      setLoading(false)
      setFinishedQuestions(null)
    } else {
      setLoading(false)
      setFinishedQuestions(data.question_id_array.length)
    }

    wereStatsFetched.current = true
  }

  const fetchQuestionCount = async () => {
    const supabase = createClient()

    const { count, error } = await supabase
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", examId)

    if (error || !count) {
      setTotalQuestions(null)
    } else {
      setTotalQuestions(count)
    }
  }

  useEffect(() => {
    if (wereStatsFetched.current) return
    fetchFlashcardsStats()
    fetchQuestionCount()
  }, [])

  useEffect(() => {
    if (finishedQuestions && totalQuestions) {
      setScorePercentage(Math.floor((finishedQuestions / totalQuestions) * 100))
    }
  }, [finishedQuestions, totalQuestions])

  return (
    <div className="flex flex-col gap-2">
      {loading && (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Ładowanie...
        </div>
      )}
      {finishedQuestions && (
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-4">
          <Donut value={scorePercentage} size={128} />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">{scorePercentage}%</p>
            <p>przerobionych pytań</p>
            <p className="text-muted">
              {totalQuestions && (
                <>
                  {finishedQuestions}/{totalQuestions}
                </>
              )}
            </p>
          </div>
        </div>
      )}
      {!finishedQuestions && !loading && (
        <div className="flex items-center justify-center h-[240px] lg:h-[128px] text-muted">
          Brak wyników
        </div>
      )}
    </div>
  )
}
