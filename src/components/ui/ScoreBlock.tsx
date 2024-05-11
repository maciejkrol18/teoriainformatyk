import { cn } from "@/lib/utils"

interface Score {
  percentageScore: number
  createdAt: string
  examName: string | undefined
}

export default async function ScoreBlock({
  percentageScore,
  createdAt,
  examName,
}: Score) {
  const date = new Date(createdAt).toLocaleDateString()
  const exam = examName ? examName : "Nieznana kwalifikacja"
  const isScorePositive = percentageScore > 50

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
      <p className="text-2xl font-medium">{percentageScore}%</p>
    </div>
  )
}
