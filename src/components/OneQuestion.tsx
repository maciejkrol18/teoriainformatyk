"use client"

import { supabase } from "@/lib/supabase"
import * as React from "react"
import Card from "./Card"
import { Question } from "@/types/question"
import { Table } from "@/types/table"
import { cn, getCollection } from "@/lib/utils"
import CardSkeleton from "./skeletons/CardSkeleton"
import ControlPanel from "./ControlPanel"

interface OneQuestionProps {
  hardMode?: boolean
  table: Table
}

export default function OneQuestion({ hardMode, table }: OneQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [questionCount, setQuestionCount] = React.useState<number | null>(null)
  const [hardCollection, setHardCollection] = React.useState<number[]>(() =>
    getCollection(`${table}_hard`),
  )
  const [easyCollection, setEasyCollection] = React.useState<number[]>(() =>
    getCollection(`${table}_easy`),
  )
  const rollButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const getRandomQuestion = async () => {
    if (!hardMode) {
      // Regular mode
      if (questionCount) {
        const randomId = Math.round(Math.random() * (questionCount - 1) + 1)

        const { data, error } = await supabase
          .from(table)
          .select("answers, content, correct_answer, id, image")
          .eq("id", randomId)

        if (error) {
          return error
        }

        if (data[0] === undefined) {
          throw new Error("Returned question is undefined")
        }

        setCurrentQuestion(data[0])
      }
    } else {
      // Hard mode - only hard questions
      const randomId = Math.round(Math.random() * hardCollection.length)

      const { data, error } = await supabase
        .from(table)
        .select("answers, content, correct_answer, id, image")
        .eq("id", randomId)

      if (error) {
        return error
      }

      if (data[0] === undefined) {
        throw new Error("Returned question is undefined")
      }

      setCurrentQuestion(data[0])
    }
  }

  const getQuestionCount = async (table: Table) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact" })
    if (error) return error
    setQuestionCount(count)
  }

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      rollButtonRef.current?.blur()
      rollQuestion()
    }
  }

  const rollQuestion = () => {
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    getRandomQuestion()
  }

  const submitAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  React.useEffect(() => {
    if (!hardMode) {
      getQuestionCount(table)
    } else {
      if (hardCollection.length === 0) {
        throw new Error("There are no IDs within the collection")
      }
    }

    window.addEventListener("keydown", handleSpacebar)

    return () => window.removeEventListener("keydown", handleSpacebar)
  }, [])

  React.useEffect(() => {
    if (questionCount) {
      rollQuestion()
    }
  }, [questionCount])

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
                    onClick={() => submitAnswer(answer)}
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
          <ControlPanel
            hardCollection={hardCollection}
            setHardCollection={setHardCollection}
            easyCollection={easyCollection}
            setEasyCollection={setEasyCollection}
            id={currentQuestion.id}
            table={table}
          />
        </>
      ) : (
        <CardSkeleton />
      )}
    </main>
  )
}
