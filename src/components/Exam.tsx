"use client"

import { supabase } from "@/lib/supabase"
import * as React from "react"
import Card from "./Card"
import { ExamQuestion } from "@/types/exam-question"
import { Table } from "@/types/table"
import { cn } from "@/lib/utils"

interface ExamProps {
  table: Table
}

type GameState = {
  isFinished: boolean
  amountCorrect: number
  amountIncorrect: number
  amountUnanswered: number
}

export default function Exam({ table }: ExamProps) {
  const [questionCount, setQuestionCount] = React.useState<number | null>(null)
  const [questionsArray, setQuestionsArray] = React.useState<ExamQuestion[]>([])
  const [counter, setCounter] = React.useState<number>(3600)
  const [gameState, setGameState] = React.useState<GameState>({
    isFinished: false,
    amountCorrect: 0,
    amountIncorrect: 0,
    amountUnanswered: 0,
  })

  const getQuestions = async (table: Table) => {
    if (questionCount) {
      const idArray: number[] = []
      for (let i = 0; i < 40; i++) {
        let randomId = Math.round(Math.random() * (questionCount - 1) + 1)
        if (idArray.some((id) => id === randomId)) {
          randomId = Math.round(Math.random() * (questionCount - 1) + 1)
        }
        idArray.push(randomId)
      }

      const { data, error } = await supabase
        .from(table)
        .select("answers, content, correct_answer, id, image")
        .filter("id", "in", `(${idArray.join(",")})`)

      if (error) {
        throw new Error(JSON.stringify(error))
      }

      if (data[0] === undefined) {
        throw new Error("Returned question is undefined")
      }

      setQuestionsArray(
        data.map((el) => {
          return {
            ...el,
            selected_answer: null,
            correct_selected: false,
          }
        }),
      )
    }
  }

  const setAnswer = (answer: string, question: ExamQuestion) => {
    setQuestionsArray((prev) =>
      prev.map((el) => {
        if (el.id === question.id) {
          if (answer === question.selected_answer) {
            return {
              ...el,
              correct_selected: false,
              selected_answer: null,
            }
          } else if (answer === question.correct_answer) {
            return {
              ...el,
              correct_selected: true,
              selected_answer: answer,
            }
          } else {
            return {
              ...el,
              correct_selected: false,
              selected_answer: answer,
            }
          }
        } else {
          return el
        }
      }),
    )
  }

  const getFormattedSeconds = (x: number) => {
    let hours = Math.floor(x / 3600)
    let minutes = Math.floor((x - hours * 3600) / 60)
    let seconds = x - hours * 3600 - minutes * 60
    return `${minutes} minut ${seconds} sekund`
  }

  const getQuestionCount = async (table: Table) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact" })
    if (error) return error
    setQuestionCount(count)
  }

  React.useEffect(() => {
    getQuestionCount(table)
  }, [])

  React.useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      amountCorrect: questionsArray.filter((question) => question.correct_selected)
        .length,
      amountIncorrect: questionsArray.filter(
        (question) => question.selected_answer && !question.correct_selected,
      ).length,
      amountUnanswered: questionsArray.filter((question) => !question.selected_answer)
        .length,
    }))
  }, [questionsArray])

  React.useEffect(() => {
    if (questionCount) {
      getQuestions(table)
    }
    const counterInterval = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(counterInterval)
  }, [questionCount])

  return (
    <>
      {questionsArray.length > 0 ? (
        <main className="flex flex-col gap-8">
          {gameState.isFinished && (
            <div className={cn("bg-primary")}>
              <h1>
                Wynik{" "}
                {gameState.amountCorrect / questionsArray.length > 0.75
                  ? "pozytywny"
                  : "negatywny"}
              </h1>
              <p>Wynik procentowy: {gameState.amountCorrect / questionsArray.length}</p>
              <p>Poprawne odp: {gameState.amountCorrect}</p>
              <p>Niepoprawne odp: {gameState.amountIncorrect}</p>
              <p>Bez odpowiedzi: {gameState.amountUnanswered}</p>
            </div>
          )}

          <p className="text-center">
            Pozostały czas: {counter && getFormattedSeconds(counter)}
          </p>

          {questionsArray.map((question) => (
            <Card key={question.id}>
              <div className="flex flex-col gap-2">
                <span className="text-secondary-300">
                  Pytanie {questionsArray.indexOf(question) + 1}. (ID #{question.id})
                </span>
                <p className="text-lg font-semibold">{question.content}</p>
              </div>
              {!question.selected_answer && gameState.isFinished && (
                <p className="text-notify">Nie udzielono odpowiedzi!</p>
              )}
              <div className="flex flex-col gap-2">
                {question.answers.map((answer, idx) => {
                  const letters = "abcd"
                  return (
                    <button
                      onClick={() => setAnswer(answer, question)}
                      className={cn(
                        "flex gap-2 bg-secondary-300 p-2 drop-shadow-lg",
                        {
                          "bg-notify":
                            (!gameState.isFinished &&
                              answer === question.selected_answer) ||
                            (gameState.isFinished &&
                              !question.selected_answer &&
                              answer === question.correct_answer),
                        },
                        {
                          "bg-positive-light":
                            gameState.isFinished &&
                            answer === question.correct_answer &&
                            question.selected_answer,
                        },
                        {
                          "bg-danger-light":
                            gameState.isFinished &&
                            answer === question.selected_answer &&
                            answer !== question.correct_answer,
                        },
                      )}
                      key={idx}
                    >
                      <span className="uppercase font-semibold">{letters.at(idx)}.</span>
                      <span className="text-left">{answer}</span>
                    </button>
                  )
                })}
              </div>
              {question.image && <img src={question.image}></img>}
            </Card>
          ))}

          <p className="text-center">
            Pozostały czas: {counter && getFormattedSeconds(counter)}
          </p>

          <button
            onClick={() =>
              setGameState((prev) => ({ ...prev, isFinished: !prev.isFinished }))
            }
            className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
          >
            Sprawdź odpowiedzi
          </button>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
