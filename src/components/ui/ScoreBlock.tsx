import { cn } from "@/lib/utils"

interface Score {
  correct: number[] | null
  incorrect: number[] | null
  unanswered: number[] | null
  createdAt: string
  examName: string | undefined
}

export default async function ScoreBlock({
  correct,
  incorrect,
  unanswered,
  createdAt,
  examName,
}: Score) {
  const totalCorrect = correct ? correct.length : 0
  const totalIncorrect = incorrect ? incorrect.length : 0
  const totalUnanswered = unanswered ? unanswered.length : 0
  const totalQuestions = totalCorrect + totalIncorrect + totalUnanswered

  const score = Math.floor((totalCorrect / totalQuestions) * 100)
  const date = new Date(createdAt).toLocaleDateString()
  const exam = examName ? examName : "Nieznana kwalifikacja"
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
