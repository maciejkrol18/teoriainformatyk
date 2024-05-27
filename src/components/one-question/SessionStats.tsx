"use client"

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useEffect, useState } from "react"
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/Credenza"
import { Button } from "../ui/Button"

interface SessionStatsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  correctAnswers: number
  incorrectAnswers: number
  timesRolled: number
}

export default function SessionStats({
  open,
  onOpenChange,
  correctAnswers,
  incorrectAnswers,
  timesRolled,
}: SessionStatsProps) {
  dayjs.extend(duration)

  const [scorePercentage, setScorePercentage] = useState(0)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setScorePercentage(
      parseFloat(
        ((correctAnswers / (correctAnswers + incorrectAnswers)) * 100).toFixed(2),
      ),
    )
  }, [correctAnswers, incorrectAnswers])

  useEffect(() => {
    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)
    return () => clearInterval(counterInterval)
  }, [])

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Aktualna sesja</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="flex flex-col gap-4 text-center text-lg lg:text-left">
            <p>Upłynęło {dayjs.duration(counter, "seconds").format("HH:mm:ss")}</p>
            <p>{correctAnswers} poprawnych odpowiedzi </p>
            <p>{incorrectAnswers} niepoprawnych odpowiedzi</p>
            <p>{timesRolled} wylosowanych pytań</p>
            <p>
              Wynik procentowy: {correctAnswers && scorePercentage}%&nbsp;
              {scorePercentage > 50 ? "(pozytywny)" : "(negatywny)"}
            </p>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose>
            <Button>Zamknij</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
