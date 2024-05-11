"use client"

import { ColumnDef } from "@tanstack/react-table"

interface HistoryExamScore {
  created_at: string
  exam_id: number | null
  user_id: string | null
  percentage_score: number
  correct: number
  incorrect: number
  unanswered: number
  time_finished: string
  time_started: string
  exams: {
    name: string
  } | null
}

export const columns: ColumnDef<HistoryExamScore>[] = [
  {
    accessorKey: "created_at",
    header: "Data",
  },
  {
    accessorFn: (row) => (row.exams ? row.exams.name : "Nieznana"),
    header: "Kwalifikacja",
  },
  {
    accessorKey: "percentage_score",
    header: "Wynik",
    cell: ({ row }) => {
      const percentageScore = parseFloat(row.getValue("percentage_score"))
      return (
        <div className={`${percentageScore > 50 ? "text-green-500" : "text-red-500"}`}>
          {percentageScore}%
        </div>
      )
    },
  },
  {
    accessorKey: "correct",
    header: "Poprawne",
  },
  {
    accessorKey: "incorrect",
    header: "Niepoprawne",
  },
  {
    accessorKey: "unanswered",
    header: "Bez odpowiedzi",
  },
]
