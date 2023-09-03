"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"
import Card from "./ui/Card"
import { Question } from "@/types/question"
import { Table } from "@/types/table"
import { cn, getCollection } from "@/lib/utils"
import CardSkeleton from "./skeletons/CardSkeleton"
import CollectionControls from "./collection/CollectionControls"
import SessionStats from "./SessionStats"

interface OneQuestionProps {
  hardMode?: boolean
  table: Table
}

export default function OneQuestion({ hardMode, table }: OneQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [questionCount, setQuestionCount] = useState<number | null>(null)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [timesRolled, setTimesRolled] = useState(0)
  const [counter, setCounter] = useState(0)

  const [hardCollection, setHardCollection] = useState<number[]>(() =>
    getCollection(`${table}_hard`),
  )
  const [easyCollection, setEasyCollection] = useState<number[]>(() =>
    getCollection(`${table}_easy`),
  )

  const rollButtonRef = useRef<HTMLButtonElement | null>(null)

  const getQuestionById = async (id: number) => {
    const { data, error } = await supabase
      .from(table)
      .select("answers, content, correct_answer, id, image")
      .eq("id", id)

    if (error) {
      console.error(error)
      throw new Error(
        "Błąd bazy danych. Sprawdź konsolę przeglądarki po więcej szczegółów",
      )
    }

    if (data[0] === undefined) {
      throw new Error("Błąd w pobieraniu danych z bazy. Spróbuj ponownie")
    }

    return data[0]
  }

  const getRandomQuestion = async () => {
    if (!hardMode) {
      if (questionCount) {
        const randomId = Math.round(Math.random() * (questionCount - 1) + 1)
        const question = await getQuestionById(randomId)
        setCurrentQuestion(question)
      }
    } else {
      const randomId = hardCollection[Math.floor(Math.random() * hardCollection.length)]
      if (randomId) {
        const question = await getQuestionById(randomId)
        setCurrentQuestion(question)
      } else {
        throw new Error("Nie udało się pobrać ID z kolekcji trudnych pytań")
      }
    }
  }

  const getQuestionCount = async (table: Table) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact" })
    if (error) {
      console.error(error)
      throw new Error("Bazie danych nie udało zwrócić się ilości rzędów w tabeli")
    }
    setQuestionCount(count)
  }

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      rollButtonRef.current?.blur()
      rollQuestion()
    }
  }

  const rollQuestion = () => {
    setTimesRolled((prev) => prev + 1)
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    getRandomQuestion()
  }

  useEffect(() => {
    if (!hardMode) {
      getQuestionCount(table)
    } else {
      if (hardCollection.length === 0) {
        throw new Error(
          "Brak ID w kolekcji trudnych pytań. Dodaj do niej minimum jedno pytanie przed rozpoczęciem specjalnego trybu",
        )
      }
      rollQuestion()
    }

    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)
    window.addEventListener("keydown", handleSpacebar)

    return () => {
      clearInterval(counterInterval)
      window.removeEventListener("keydown", handleSpacebar)
    }
  }, [])

  useEffect(() => {
    if (!hardMode) {
      if (questionCount) {
        rollQuestion()
      }
    }
  }, [questionCount])

  useEffect(() => {
    if (currentQuestion && selectedAnswer) {
      if (selectedAnswer === currentQuestion.correct_answer) {
        setCorrectAnswers((prev) => prev + 1)
      } else {
        setIncorrectAnswers((prev) => prev + 1)
      }
    }
  }, [selectedAnswer])

  return (
    <main className="flex flex-col gap-6 pb-8">
      <button
        ref={rollButtonRef}
        onClick={() => rollQuestion()}
        className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
      >
        {selectedAnswer ? "Następne" : "Losuj"}{" "}
        <span className="hidden lg:inline">(Spacja)</span>
      </button>
      {currentQuestion ? (
        <>
          <Card>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-300">#{currentQuestion.id}</span>
              <h1 className="text-lg font-semibold">{currentQuestion.content}</h1>
            </div>
            <div className="flex flex-col gap-2">
              {currentQuestion.answers.map((answer, idx) => {
                const letters = "abcd"
                return (
                  <button
                    onClick={() => setSelectedAnswer(answer)}
                    disabled={Boolean(selectedAnswer)}
                    className={cn(
                      "flex gap-2 bg-secondary-300 p-2 drop-shadow-lg",
                      {
                        "bg-positive-light":
                          selectedAnswer && answer === currentQuestion.correct_answer,
                      },
                      {
                        "bg-danger-light":
                          selectedAnswer &&
                          selectedAnswer === answer &&
                          answer !== currentQuestion.correct_answer,
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
            {currentQuestion.image && <img src={currentQuestion.image}></img>}
          </Card>
          <div className="flex gap-4 items-center justify-center text-secondary-300">
            <CollectionControls
              hardCollection={hardCollection}
              setHardCollection={setHardCollection}
              easyCollection={easyCollection}
              setEasyCollection={setEasyCollection}
              id={currentQuestion.id}
              table={table}
            />
            <SessionStats
              counter={counter}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              timesRolled={timesRolled}
            />
          </div>
        </>
      ) : (
        <CardSkeleton />
      )}
    </main>
  )
}
