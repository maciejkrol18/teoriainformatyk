import { BarChart } from 'lucide-react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import MobileDrawer from './ui/MobileDrawer'
import DesktopDialog from './ui/DesktopDialog'
import { useEffect, useState } from 'react'

interface SessionStatsProps {
  counter: number
  correctAnswers: number
  incorrectAnswers: number
  timesRolled: number
}

export default function SessionStats({
  counter,
  correctAnswers,
  incorrectAnswers,
  timesRolled,
}: SessionStatsProps) {
  dayjs.extend(duration)

  const [scorePercentage, setScorePercentage] = useState(0)

  useEffect(() => {
    setScorePercentage(
      parseFloat(
        ((correctAnswers / (correctAnswers + incorrectAnswers)) * 100).toFixed(2),
      ),
    )
  }, [correctAnswers, incorrectAnswers])

  const statsContent = (
    <div className="flex flex-col gap-4">
      <p>Upłynęło {dayjs.duration(counter, 'seconds').format('HH:mm:ss')}</p>
      <p>{correctAnswers} poprawnych odpowiedzi </p>
      <p>{incorrectAnswers} niepoprawnych odpowiedzi</p>
      <p>{timesRolled} wylosowanych pytań</p>
      <p>
        Wynik procentowy: {correctAnswers && scorePercentage}%&nbsp;
        {scorePercentage > 50 ? '(pozytywny)' : '(negatywny)'}
      </p>
    </div>
  )

  return (
    <>
      <div className="md:hidden">
        <MobileDrawer
          icon={<BarChart className="w-8 h-8" />}
          title="Statystyki sesji"
          content={statsContent}
        />
      </div>
      <div className="hidden md:block">
        <DesktopDialog
          icon={<BarChart className="w-8 h-8" />}
          title="Statystyki sesji"
          content={statsContent}
        />
      </div>
    </>
  )
}
