"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import Card from "./Card"
import { ExamQuestion } from "@/types/exam-question"
import { Table } from "@/types/table"
import { ExamScore } from "@/types/exam-score"
import { cn } from "@/lib/utils"
import { BadgePercent, CheckCircle2, HelpCircle, XCircle } from "lucide-react"
import ExamSkeleton from "./skeletons/ExamSkeleton"

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
  const [questionCount, setQuestionCount] = useState<number | null>(null)
  const [questionsArray, setQuestionsArray] = useState<ExamQuestion[]>([])
  const [counter, setCounter] = useState(3600)
  const [gameState, setGameState] = useState<GameState>({
    isFinished: false,
    amountCorrect: 0,
    amountIncorrect: 0,
    amountUnanswered: 0,
  })
  const [scorePercentage, setScorePercentage] = useState(0)

  const getQuestions = async (table: Table) => {
    if (questionCount) {
      const idArray: number[] = []
      for (let i = 0; i < 40; i++) {
        let randomId = Math.round(Math.random() * (questionCount - 1) + 1)
        while (idArray.some((id) => id === randomId)) {
          randomId = Math.round(Math.random() * (questionCount - 1) + 1)
        }
        idArray.push(randomId)
      }

      const { data, error } = await supabase
        .from(table)
        .select("answers, content, correct_answer, id, image")
        .filter("id", "in", `(${idArray.join(",")})`)

      if (error) {
        console.error(error)
        throw new Error(
          "Błąd bazy danych. Sprawdź konsolę przeglądarki po więcej szczegółów",
        )
      }

      if (data[0] === undefined) {
        throw new Error("Błąd w pobieraniu danych z bazy. Spróbuj ponownie")
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

  const endGame = () => {
    if (gameState.isFinished) {
      setGameState((prev) => ({ ...prev, isFinished: false }))
      setCounter(3600)
      getQuestions(table)
    } else {
      saveScore()
      setGameState((prev) => ({ ...prev, isFinished: true }))
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const saveScore = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const localScores = localStorage.getItem("exam_scores")
      const newScore = {
        qualification: table === "questions_inf02" ? "INF.02" : "INF.03",
        date: new Date(),
        amountCorrect: gameState.amountCorrect,
        amountIncorrect: gameState.amountIncorrect,
        amountUnanswered: gameState.amountUnanswered,
        scorePercentage: scorePercentage,
      }
      if (localScores) {
        const parsedScores = JSON.parse(localScores) as ExamScore[]
        parsedScores.unshift(newScore)
        if (parsedScores.length > 5) {
          parsedScores.pop()
        }
        localStorage.setItem("exam_scores", JSON.stringify(parsedScores))
      } else {
        const scores: ExamScore[] = [newScore]
        localStorage.setItem("exam_scores", JSON.stringify(scores))
      }
    }
  }

  const getQuestionCount = async (table: Table) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact" })
    if (error) return error
    setQuestionCount(count)
  }

  useEffect(() => {
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

  useEffect(() => {
    setScorePercentage((gameState.amountCorrect / questionsArray.length) * 100)
  }, [gameState])

  useEffect(() => {
    if (questionCount) {
      getQuestions(table)
    }
    const counterInterval = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(counterInterval)
  }, [questionCount])

  useEffect(() => {
    if (counter === 0) {
      endGame()
    }
  }, [counter])

  useEffect(() => {
    getQuestionCount(table)
  }, [])

  return (
    <>
      {questionsArray.length > 0 ? (
        <main className="flex flex-col gap-8 pb-8 md:w-full md:max-w-lg md:mx-auto">
          {gameState.isFinished && (
            <Card
              className={cn(
                "text-center items-center",
                {
                  "border-2 border-danger-light": scorePercentage < 75,
                },
                {
                  "border-2 border-positive-light": scorePercentage > 75,
                },
              )}
            >
              <h1 className="text-2xl font-bold">
                Wynik {scorePercentage > 75 ? "pozytywny" : "negatywny"}
              </h1>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2 items-center">
                  <CheckCircle2 className="text-positive-light" />
                  {gameState.amountCorrect}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <XCircle className="text-danger-light" />
                  {gameState.amountIncorrect}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <HelpCircle className="text-notify" />
                  {gameState.amountUnanswered}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <BadgePercent className="text-accent-gold" />
                  {(gameState.amountCorrect / questionsArray.length) * 100}%
                </div>
              </div>
            </Card>
          )}

          {!gameState.isFinished && counter && (
            <p className="text-center">Pozostały czas: {getFormattedSeconds(counter)}</p>
          )}

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
                      disabled={gameState.isFinished}
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

          {!gameState.isFinished && counter && (
            <p className="text-center">Pozostały czas: {getFormattedSeconds(counter)}</p>
          )}

          <button
            onClick={() => endGame()}
            className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
          >
            {gameState.isFinished ? "Spróbuj ponownie" : "Sprawdź odpowiedzi"}
          </button>
        </main>
      ) : (
        <ExamSkeleton />
      )}
    </>
  )
}
