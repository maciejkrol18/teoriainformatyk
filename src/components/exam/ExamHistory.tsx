"use client"

import { ExamScore } from "@/types/exam-score"
import { useEffect, useState } from "react"
import Card from "../ui/Card"
import dayjs from "dayjs"
import pl from "dayjs/locale/pl"
import relativeTime from "dayjs/plugin/relativeTime"
import duration from "dayjs/plugin/duration"
import { CheckCircle2, HelpCircle, XCircle, BadgePercent } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExamHistory() {
  dayjs.locale(pl)
  dayjs.extend(relativeTime)
  dayjs.extend(duration)
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
          const formattedDate = dayjs(score.date).format(
            "D MMMM YYYY [roku o godzinie] HH:mm",
          )
          const timeElapsed = dayjs(score.date).from(new Date())
          return (
            <Card
              key={idx}
              className={cn(
                "!flex-row items-center justify-between",
                {
                  "!border-2 !border-danger-light": score.scorePercentage < 75,
                },
                {
                  "!border-2 !border-positive-light": score.scorePercentage > 75,
                },
              )}
            >
              <div>
                <p className="text-lg font-semibold">{score.qualification}</p>
                <p title={formattedDate}>{timeElapsed}</p>
              </div>
              <div className="flex gap-4 text-center">
                <div className="flex flex-col gap-2" title="Poprawne odpowiedzi">
                  <CheckCircle2 className="text-positive-light" />
                  {score.amountCorrect}
                </div>
                <div className="flex flex-col gap-2" title="Niepoprawne odpowiedzi">
                  <XCircle className="text-danger-light" />
                  {score.amountIncorrect}
                </div>
                <div className="flex flex-col gap-2" title="Pytania bez odpowiedzi">
                  <HelpCircle className="text-notify" />
                  {score.amountUnanswered}
                </div>
                <div
                  className="flex flex-col gap-2 items-center"
                  title="Wynik procentowy"
                >
                  <BadgePercent className="text-accent-gold" />
                  {score.scorePercentage}
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
