"use client"

import { useEffect, useState } from "react"
import Card from "./ui/Card"
import { QueryExam } from "@/types/query-question"
import { supabase } from "@/lib/supabase"
import CardSkeleton from "./skeletons/CardSkeleton"
import Image from "next/image"

const TABLE_NAME = "query_training" as const

interface SqlTrainingProps {}

export default function SqlTraining({}: SqlTrainingProps) {
  const [currentExam, setCurrentExam] = useState<QueryExam | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
  const [examCount, setExamCount] = useState<number | null>(0)

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
      setCurrentQuestion(null)
      setCurrentAnswer(null)
      setCurrentExam(exam)
    }
  }

  useEffect(() => {
    getExamCount()
  }, [])

  useEffect(() => {
    if (currentExam) {
      const randomIndex = Math.round(Math.random() * 3)
      const question = currentExam.questions[randomIndex]
      const answer = currentExam.answers[randomIndex]
      if (question && answer) {
        setCurrentQuestion(question)
        setCurrentAnswer(answer)
      } else {
        throw new Error("question or answer was undefined")
      }
    }
  }, [currentExam])

  useEffect(() => {
    if (examCount) {
      rollExam()
    }
  }, [examCount])

  return (
    <main className="flex flex-col gap-6 pb-8 md:w-full md:max-w-lg md:mx-auto">
      {currentQuestion && currentAnswer && currentExam ? (
        <>
          <button
            onClick={() => rollExam()}
            className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
          >
            Losuj
          </button>
          <Card>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-300">{currentExam.exam_code}</span>
              <h1 className="text-lg">
                <span className="font-semibold">Napisz zapytanie&nbsp;</span>
                {currentQuestion}
              </h1>
            </div>
            <div className="flex justify-between gap-2">
              <input
                className="bg-primary placeholder:text-secondary-300 shadow-card-inset rounded-md p-2 w-full"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Wpisz kwerendę"
              />
              <button
                onClick={() => rollExam()}
                className="bg-secondary-300 text-xl shadow-card-inset rounded-lg px-4 py-2 w-max"
              >
                Sprawdź
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/query_images/${currentExam.exam_code}.webp`}
                alt={`Schemat bazy danych do arkusza ${currentExam.exam_code}`}
                width={500}
                height={200}
              />
            </div>
            <h2 className="font-semibold">Komentarz do schematu</h2>
            <p>{currentExam.comment}</p>
          </Card>
        </>
      ) : (
        <CardSkeleton />
      )}
    </main>
  )
}
