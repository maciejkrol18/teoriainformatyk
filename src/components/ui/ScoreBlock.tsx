import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import pl from 'dayjs/locale/pl'
import relativeTime from 'dayjs/plugin/relativeTime'

interface Score {
  percentageScore: number
  createdAt: string
  examName: string | undefined
}

dayjs.locale(pl)
dayjs.extend(relativeTime)

export default async function ScoreBlock({
  percentageScore,
  createdAt,
  examName,
}: Score) {
  const formattedDate = dayjs(createdAt).from(new Date())
  const exam = examName ? examName : 'Nieznana kwalifikacja'
  const isScorePositive = percentageScore > 50

  return (
    <div
      className={cn(
        'flex justify-between items-center p-2 border',
        isScorePositive ? 'border-green-800' : 'border-red-800',
      )}
    >
      <div>
        <p className="text-xl font-medium">{exam}</p>
        <p className="text-muted">{formattedDate}</p>
      </div>
      <p className="text-2xl font-medium">{percentageScore}%</p>
    </div>
  )
}
