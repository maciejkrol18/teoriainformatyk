import { cn } from "@/lib/utils"

interface Score {
  correct: number
  incorrect: number
  unanswered: number
  created_at: string
  examName: string | undefined
}

export default async function ScoreBlock({
  correct,
  incorrect,
  unanswered,
  created_at,
  examName,
}: Score) {
  const totalQuestions = correct + incorrect + unanswered
  const score = Math.floor((correct / totalQuestions) * 100)
  const date = new Date(created_at).toLocaleDateString()
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
