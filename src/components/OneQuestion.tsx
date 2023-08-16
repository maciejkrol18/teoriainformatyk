"use client"

import { supabase } from "@/lib/supabase"
import * as React from "react"
import Card from "./Card"
import { Question } from "@/types/question"
import { Database } from "@/types/database"
import { cn } from "@/lib/utils"

interface OneQuestionProps {
  database: keyof Database["public"]["Tables"]
}

export default function OneQuestion({ database }: OneQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)

  const getRandomQuestion = async () => {
    const randomId = Math.round(Math.random() * (1043 - 1) + 1)

    const { data, error } = await supabase
      .from(database)
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

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.key === "Space") {
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
    getRandomQuestion()

    window.addEventListener("keydown", handleSpacebar)

    return () => window.removeEventListener("keydown", handleSpacebar)
  }, [])

  return (
    <main className="flex flex-col gap-6 pb-8">
      <button
        onClick={() => rollQuestion()}
        className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
      >
        Losuj (Spacja)
      </button>
      {currentQuestion ? (
        <Card>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-secondary-300">#{currentQuestion.id}</span>
            <h1 className="text-xl font-semibold">{currentQuestion.content}</h1>
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
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
