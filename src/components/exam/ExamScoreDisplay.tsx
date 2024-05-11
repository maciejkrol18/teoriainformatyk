"use client"

import { cn } from "@/lib/utils"
import { ExamQuestion } from "@/types/exam-question"
import { ExamScore } from "@/types/exam-score"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { Check, Clock, HelpCircle, XIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface ExamScoreDisplayProps {
  score: ExamScore
  questions: ExamQuestion[]
}

export default function ExamScoreDisplay({ score, questions }: ExamScoreDisplayProps) {
  dayjs.extend(duration)

  const [finishTime, setFinishTime] = useState<string>("")

  useEffect(() => {
    const startDate = new Date(score.time_started)
    const endDate = new Date(score.time_finished)
    const finishTimeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000
    const duration = dayjs.duration(finishTimeInSeconds, "seconds")
    const formattedTime = duration.format("mm:ss [(mm:ss)]")
    setFinishTime(formattedTime)
  }, [])

  const getQuestionColor = (question: ExamQuestion): string => {
    if (!question.selected_answer) {
      return "blue-800"
    }
    if (question.correct_selected) {
      return "green-800"
    } else {
      return "red-800"
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 bg-background-light border",
        score.percentage_score && score.percentage_score > 50
          ? "border-green-800"
          : "border-red-800",
      )}
    >
      <div className="flex justify-between font-bold text-2xl">
        <p>
          {score.percentage_score && score.percentage_score > 50
            ? "Pozytywny"
            : "Negatywny"}
        </p>
        <p>{score.percentage_score && score.percentage_score}%</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {questions.map((question, index) => {
          return (
            <a
              className={`grid place-items-center w-10 h-10 border border-${getQuestionColor(
                question,
              )}`}
              href={`#${index + 1}`}
            >
              {index + 1}
            </a>
          )
        })}
      </div>
      <p className="text-lg font-semibold">Szczegóły wyniku</p>
      <div className="flex flex-col gap-4">
        <p className="flex gap-2">
          <Check /> <span className="font-bold">{score.correct}</span> poprawnych
          odpowiedzi
        </p>
        <p className="flex gap-2">
          <XIcon /> <span className="font-bold">{score.incorrect}</span> niepoprawnych
          odpowiedzi
        </p>
        <p className="flex gap-2">
          <HelpCircle /> <span className="font-bold">{score.unanswered}</span>{" "}
          nieudzielonych odpowiedzi
        </p>
        <p className="flex gap-2">
          <Clock /> Rozwiązano w{" "}
          <span className="font-bold">{finishTime && finishTime}</span>
        </p>
      </div>
    </div>
  )
}
