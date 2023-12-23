"use client"

import { supabase, supabaseUrl } from "@/lib/supabase"
import { useState, useEffect } from "react"
import Card from "./ui/Card"
import { Question } from "@/types/question"
import { Table } from "@/types/table"
import { cn, getCollection } from "@/lib/utils"
import CardSkeleton from "./skeletons/CardSkeleton"
import CollectionControls from "./collection/CollectionControls"
import SessionStats from "./SessionStats"
import Image from "next/image"

interface OneQuestionProps {
  table: Table
}

export default function OneQuestion({ table }: OneQuestionProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Question["answers"] | null>(null)
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

  const getQuestionById = async (id: number) => {
    const { data, error } = await supabase
      .from(table)
      .select("answers, content, correct_answer, id, image")
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

  const getRandomQuestion = async () => {
    if (questionCount) {
      const randomId = Math.round(Math.random() * (questionCount - 1) + 1)
      const question = await getQuestionById(randomId)
      setQuestion(question)
    }
  }

  const getQuestionCount = async (table: Table) => {
    const { count, error } = await supabase.from(table).select("id", { count: "exact" })
    if (error) {
      console.error(error)
      throw new Error("Database failed to return the amount of rows")
    }
    setQuestionCount(count)
  }

  const rollQuestion = () => {
    setTimesRolled((prev) => prev + 1)
    setQuestion(null)
    setSelectedAnswer(null)
    getRandomQuestion()
  }

  useEffect(() => {
    getQuestionCount(table)

    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)

    return () => clearInterval(counterInterval)
  }, [])

  useEffect(() => {
    if (questionCount) {
      rollQuestion()
    }
  }, [questionCount])

  useEffect(() => {
    if (question && selectedAnswer) {
      if (selectedAnswer === question.correct_answer) {
        setCorrectAnswers((prev) => prev + 1)
      } else {
        setIncorrectAnswers((prev) => prev + 1)
      }
    }
  }, [selectedAnswer])

  useEffect(() => {
    if (question) {
      setAnswers(question.answers.sort((a, b) => 0.5 - Math.random()))
    }
  }, [question])

  return (
    <main className="flex flex-col gap-6 pb-8 md:w-full md:max-w-lg md:mx-auto">
      <button
        onClick={() => rollQuestion()}
        className="bg-accent-purple text-xl font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase"
      >
        {selectedAnswer ? "Następne" : "Losuj"}
      </button>
      {question && answers ? (
        <>
          <Card>
            <div className="flex flex-col gap-2">
              <span className="text-secondary-300">#{question.id}</span>
              <h1 className="text-lg font-semibold">{question.content}</h1>
            </div>
            <div className="flex flex-col gap-2">
              {answers.map((answer, idx) => {
                const letters = "abcd"
                return (
                  <button
                    onClick={() => setSelectedAnswer(answer)}
                    disabled={Boolean(selectedAnswer)}
                    className={cn(
                      "flex gap-2 bg-secondary-300 p-2 drop-shadow-lg",
                      {
                        "bg-positive-light":
                          selectedAnswer && answer === question.correct_answer,
                      },
                      {
                        "bg-danger-light":
                          selectedAnswer &&
                          selectedAnswer === answer &&
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
                src={`${supabaseUrl}/storage/v1/object/public/questions_${table}_images/${question.id}.webp`}
                alt="Obrazek załączony do pytania"
                width={500}
                height={200}
              />
            )}
          </Card>
          <div className="flex gap-4 items-center justify-center text-secondary-300">
            <CollectionControls
              hardCollection={hardCollection}
              setHardCollection={setHardCollection}
              easyCollection={easyCollection}
              setEasyCollection={setEasyCollection}
              id={question.id}
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
