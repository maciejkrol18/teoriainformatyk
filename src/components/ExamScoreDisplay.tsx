import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, HelpCircle, BadgePercent } from "lucide-react"
import Card from "./ui/Card"

interface ExamScoreDisplayProps {
  scorePercentage: number
  amountCorrect: number
  amountIncorrect: number
  amountUnanswered: number
  questionCount: number
}

export default function ExamScoreDisplay({
  scorePercentage,
  amountCorrect,
  amountIncorrect,
  amountUnanswered,
  questionCount,
}: ExamScoreDisplayProps) {
  return (
    <Card
      className={cn(
        "text-center items-center",
        {
          "!border-2 !border-danger-light": scorePercentage < 75,
        },
        {
          "!border-2 !border-positive-light": scorePercentage > 75,
        },
      )}
    >
      <h1 className="text-2xl font-bold">
        Wynik {scorePercentage > 75 ? "pozytywny" : "negatywny"}
      </h1>
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 items-center">
          <CheckCircle2 className="text-positive-light" />
          {amountCorrect}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <XCircle className="text-danger-light" />
          {amountIncorrect}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <HelpCircle className="text-notify" />
          {amountUnanswered}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <BadgePercent className="text-accent-gold" />
          {(amountCorrect / questionCount) * 100}%
        </div>
      </div>
    </Card>
  )
}
