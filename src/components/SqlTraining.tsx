"use client"

import { useEffect, useRef, useState } from "react"
import Card from "./ui/Card"
import { QueryExam } from "@/types/query-question"
import { supabase, supabaseUrl } from "@/lib/supabase"
import CardSkeleton from "./skeletons/CardSkeleton"
import Image from "next/image"
import QueryInput from "./QueryInput"
import { Parser } from "node-sql-parser"

const TABLE_NAME = "query_training" as const

export default function SqlTraining() {
  const [exam, setExam] = useState<QueryExam | null>(null)
  const [question, setQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [examCount, setExamCount] = useState<number | null>(0)

  const [code, setCode] = useState("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const parser = useRef(new Parser())

  const getExamById = async (id: number) => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("exam_code, comment, questions, answers")
      .eq("id", id)

    if (error) {
      console.error(error)
      throw new Error("Database error, check browser console")
    }

    if (data[0] === undefined) {
      throw new Error("An error occured while fetching data from the database")
    }

    return data[0]
  }

  const getExamCount = async () => {
    const { count, error } = await supabase
      .from(TABLE_NAME)
      .select("id", { count: "exact" })
    if (error) {
      console.error(error)
      throw new Error("Database failed to return the amount of rows")
    }
    setExamCount(count)
  }

  const rollExam = async () => {
    if (examCount) {
      const randomId = Math.round(Math.random() * (examCount - 1) + 1)
      const exam = await getExamById(randomId)
      setQuestion(null)
      setAnswer(null)
      setIsAnswerCorrect(false)
      setIsAnswerSubmitted(false)
      setCode("")
      setExam(exam)
    }
  }

  const checkAnswer = () => {
    if (answer) {
      try {
        setIsAnswerSubmitted(true)

        const parsedAnswer = parser.current.parse(
          code.charAt(code.length - 1) === ";"
            ? code.substring(0, code.indexOf(";"))
            : code,
        )
        const parsedValidAnswer = parser.current.parse(answer)

        setIsAnswerCorrect(
          JSON.stringify(parsedAnswer) === JSON.stringify(parsedValidAnswer),
        )
      } catch (error) {
        setIsAnswerCorrect(false)
        console.error(error)
      }
    }
  }

  const solve = () => {
    if (answer) {
      setCode(answer)
    }
  }

  useEffect(() => {
    getExamCount()
  }, [])

  useEffect(() => {
    if (exam) {
      const randomIndex = Math.round(Math.random() * 3)
      const question = exam.questions[randomIndex]
      const answer = exam.answers[randomIndex]
      if (question && answer) {
        setQuestion(question)
        setAnswer(answer)
      } else {
        throw new Error("question or answer was undefined")
      }
    }
  }, [exam])

  useEffect(() => {
    if (examCount) {
      rollExam()
    }
  }, [examCount])

  return (
    <main className="flex flex-col gap-6 pb-8 md:w-full md:max-w-lg md:mx-auto">
      {question && answer && exam ? (
        <>
          <button
            onClick={() => rollExam()}
            className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
          >
            Losuj
          </button>
          <Card>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-300">{exam.exam_code}</span>
              <h1 className="text-lg">
                <span className="font-semibold">Napisz zapytanie&nbsp;</span>
                {question}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <QueryInput state={code} setState={setCode} />
              <div className="flex justify-between gap-2 w-full">
                <button
                  onClick={() => checkAnswer()}
                  className="bg-secondary-300 text-lg shadow-card-inset rounded-lg px-4 py-2 w-max uppercase grow"
                >
                  Sprawdź
                </button>
                <button
                  onClick={() => solve()}
                  className="bg-positive-dark text-lg shadow-card-inset rounded-lg px-4 py-2 w-max uppercase grow"
                >
                  Rozwiąż
                </button>
              </div>
            </div>
            {isAnswerSubmitted && (
              <p
                className={isAnswerCorrect ? "text-positive-light" : "text-danger-light"}
              >
                {isAnswerCorrect ? "Poprawna odpowiedź" : "Niepoprawna odpowiedź"}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <Image
                src={`${supabaseUrl}/storage/v1/object/public/query_images/${exam.exam_code}.webp`}
                alt={`Schemat bazy danych do arkusza ${exam.exam_code}`}
                width={500}
                height={200}
              />
            </div>
            <h2 className="font-semibold">Komentarz do schematu</h2>
            <p>{exam.comment}</p>
          </Card>
        </>
      ) : (
        <CardSkeleton />
      )}
    </main>
  )
}
