import { useEffect, useState } from "react"

interface ExamStopwatchProps {
  initialValue: number
  onEnd: () => void
}

export default function ExamTimer({ initialValue, onEnd }: ExamStopwatchProps) {
  const [counter, setCounter] = useState(initialValue)

  const getFormattedSeconds = (x: number) => {
    let hours = Math.floor(x / 3600)
    let minutes = Math.floor((x - hours * 3600) / 60)
    let seconds = x - hours * 3600 - minutes * 60
    return `${minutes} minut ${seconds} sekund`
  }

  useEffect(() => {
    const counterInterval = setInterval(() => setCounter((prev) => prev - 1), 1000)

    return () => clearInterval(counterInterval)
  }, [])

  useEffect(() => {
    if (counter === 0) {
      onEnd()
    }
  }, [counter])

  return <p className="text-center">Pozostały czas: {getFormattedSeconds(counter)}</p>
}
