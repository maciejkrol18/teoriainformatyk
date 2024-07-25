import { useEffect, useState } from 'react'

interface ExamStopwatchProps {
  toCountdownMiliseconds: number
  intervalMiliseconds: number
  onEnd: () => void
}

export default function ExamTimer({
  toCountdownMiliseconds,
  intervalMiliseconds,
  onEnd,
}: ExamStopwatchProps) {
  const [time, setTime] = useState(toCountdownMiliseconds)
  const [refTime, setRefTime] = useState(Date.now())

  const getFormattedSeconds = (ms: number) => {
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    return `${minutes} minut ${seconds} sekund`
  }

  useEffect(() => {
    if (time <= 0) {
      onEnd()
    }

    const countDownUntilZero = () => {
      setTime((prevTime) => {
        if (prevTime <= 0) return 0

        const now = Date.now()
        const interval = now - refTime
        setRefTime(now)
        return prevTime - interval
      })
    }

    setTimeout(countDownUntilZero, intervalMiliseconds)
  }, [time])

  return <p className="text-center">Pozostały czas: {getFormattedSeconds(time)}</p>
}
