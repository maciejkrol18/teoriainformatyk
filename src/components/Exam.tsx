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

export default function Exam({ table }: ExamProps) {
  const [questionCount, setQuestionCount] = React.useState<number | null>(null)
  const [questionsArray, setQuestionsArray] = React.useState<ExamQuestion[]>([])

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
          }
        }),
      )
    }
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
    if (questionCount) {
      getQuestions(table)
    }
  }, [questionCount])

  return (
    <>
      {questionsArray.length === 40 ? (
        <>
          {questionsArray.map((question) => (
            <Card key={question.id}>
              <div className="flex flex-col gap-2">
                <span className="text-secondary-300">
                  Pytanie {questionsArray.indexOf(question) + 1}. (ID #{question.id})
                </span>
                <h1 className="text-lg font-semibold">{question.content}</h1>
              </div>
              <div className="flex flex-col gap-2">
                {question.answers.map((answer, idx) => {
                  const letters = "abcd"
                  return (
                    <button
                      className={cn("flex gap-2 bg-secondary-300 p-2 drop-shadow-lg")}
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
