"use client"

import { ExamScore } from "@/types/exam-score"
import { useEffect, useState } from "react"
import Card from "../ui/Card"
import dayjs from "dayjs"
import pl from "dayjs/locale/pl"
import { Calendar, CheckCircle2, HelpCircle, XCircle } from "lucide-react"

export default function ExamHistory() {
  dayjs.locale(pl)
  const [examScores, setExamScores] = useState<ExamScore[]>([])

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const localScores = localStorage.getItem("exam_scores")
      if (localScores) {
        const parsedScores = JSON.parse(localScores) as ExamScore[]
        setExamScores(parsedScores)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {examScores.length > 0 ? (
        examScores.map((score, idx) => {
          const formattedDate = dayjs(score.date).format("D MMMM YYYY [roku], HH:mm")
          return (
            <Card key={idx}>
              <p className="text-lg font-semibold">
                Wynik {score.scorePercentage > 50 ? "pozytywny" : "negatywny"} (
                {score.scorePercentage}%)
              </p>
              <p>Kwalifikacja: {score.qualification}</p>
              <div className="flex gap-2">
                <Calendar className="text-accent-purple" />
                <p>{formattedDate}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <CheckCircle2 className="text-positive-light" />
                  <p>{score.amountCorrect}</p>
                </div>
                <div className="flex gap-2">
                  <XCircle className="text-danger-light" />
                  <p>{score.amountIncorrect}</p>
                </div>
                <div className="flex gap-2">
                  <HelpCircle className="text-notify" />
                  <p>{score.amountUnanswered}</p>
                </div>
              </div>
            </Card>
          )
        })
      ) : (
        <p>Brak zarejestrowanych wyników</p>
      )}
    </div>
  )
}
