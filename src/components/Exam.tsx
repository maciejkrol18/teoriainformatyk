"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"
import Card from "./ui/Card"
import { ExamQuestion } from "@/types/exam-question"
import { Table } from "@/types/table"
import { cn } from "@/lib/utils"
import ExamScoreDisplay from "./ExamScoreDisplay"
import ExamSkeleton from "./skeletons/ExamSkeleton"
import Image from "next/image"
import ExamStopwatch from "./ExamTimer"
import { ExamScore } from "@/types/exam-score"

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
  const gameLengthMiliseconds = useRef(3600000)
  const [gameState, setGameState] = useState<GameState>({
    isFinished: false,
    amountCorrect: 0,
    amountIncorrect: 0,
    amountUnanswered: 0,
  })
  const [scorePercentage, setScorePercentage] = useState(0)
  console.log("exam re-rendered")

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
            answers: el.answers.sort((a, b) => 0.5 - Math.random()),
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

  const endGame = () => {
    if (gameState.isFinished) {
      window.location.reload()
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
  }, [questionCount])

  useEffect(() => {
    getQuestionCount(table)
  }, [])

  return (
    <>
      {questionsArray.length > 0 ? (
        <main className="flex flex-col gap-8 pb-8 md:w-full md:max-w-lg md:mx-auto">
          {gameState.isFinished && (
            <ExamScoreDisplay
              scorePercentage={scorePercentage}
              amountCorrect={gameState.amountCorrect}
              amountIncorrect={gameState.amountIncorrect}
              amountUnanswered={gameState.amountUnanswered}
              questionCount={questionsArray.length}
            />
          )}

          {!gameState.isFinished && (
            <ExamStopwatch
              toCountdownMiliseconds={gameLengthMiliseconds.current}
              intervalMiliseconds={100}
              onEnd={endGame}
            />
          )}

          {questionsArray.map((question, idx) => (
            <Card key={question.id}>
              <div className="flex flex-col gap-2">
                <span className="text-secondary-300">
                  Pytanie {idx + 1}. (ID #{question.id})
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
              {question.image && (
                <Image
                  src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/${table}_images/${question.id}.webp`}
                  alt="Obrazek załączony do pytania"
                  width={500}
                  height={200}
                />
              )}
            </Card>
          ))}

          {!gameState.isFinished && (
            <ExamStopwatch
              toCountdownMiliseconds={gameLengthMiliseconds.current}
              intervalMiliseconds={100}
              onEnd={endGame}
            />
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
