"use client"

import { supabaseUrl } from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"
import Card from "./ui/Card"
import { cn } from "@/lib/utils"
import SessionStats from "./SessionStats"
import AnswerBox from "./ui/AnswerBox"
import QuestionImage from "./ui/QuestionImage"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/types/database"
import { Button } from "./ui/Button"
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionMarker,
  questionAnswerVariants,
} from "./ui/Question"
import { VariantProps } from "class-variance-authority"

interface OneQuestionProps {
  examId: number
}

type Question = Database["public"]["Tables"]["questions"]["Row"]

export default function OneQuestion({ examId }: OneQuestionProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const wasEventListenerInitialized = useRef<boolean>(false)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [timesRolled, setTimesRolled] = useState(0)
  const [counter, setCounter] = useState(0)

  const getRandomQuestion = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.rpc("get_random_questions", {
      amount: 1,
      exam_id: examId,
    })
    if (error) {
      throw new Error(`Błąd pobierania pytania z bazy: ${error.message}`)
    } else if (!data[0]) {
      throw new Error("Błąd pobierania pytania z bazy. Spróbuj ponownie.")
    } else {
      const questionWithShuffledAnswers = {
        ...data[0],
        answers: data[0].answers.sort((a: string, b: string) => 0.5 - Math.random()),
      }
      setQuestion(questionWithShuffledAnswers)
    }
  }

  const rollQuestion = () => {
    setTimesRolled((prev) => prev + 1)
    setQuestion(null)
    setSelectedAnswer(null)
    getRandomQuestion()
  }

  const getAnswerVariant = (
    answer: string,
    question: Question,
  ): VariantProps<typeof questionAnswerVariants>["variant"] => {
    if (selectedAnswer) {
      if (!selectedAnswer && answer === question.correct_answer) {
        return "unanswered"
      } else if (answer === question.correct_answer && selectedAnswer) {
        return "correct"
      } else if (answer === selectedAnswer && answer !== question.correct_answer) {
        return "incorrect"
      }
    } else {
      return answer === selectedAnswer ? "selected" : "default"
    }
  }

  useEffect(() => {
    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)
    return () => clearInterval(counterInterval)
  }, [])

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
    getRandomQuestion()
  }, [])

  useEffect(() => {
    if (wasEventListenerInitialized.current) return
    const rollOnSpaceClick = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        rollQuestion()
      }
    }
    window.addEventListener("keyup", (e) => rollOnSpaceClick(e))
    wasEventListenerInitialized.current = true
    return () => window.removeEventListener("keyup", (e) => rollOnSpaceClick(e))
  }, [])

  return (
    <div className="flex flex-col grow gap-8 justify-center md:w-full md:max-w-xl md:mx-auto">
      <Button
        onClick={() => rollQuestion()}
        variant="primary"
        className="font-semibold uppercase"
      >
        {selectedAnswer ? "Następne" : "Losuj"}
      </Button>
      {question ? (
        <Question>
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionAnswersContainer>
            {question.answers.map((answer, index) => {
              const atlas = "ABCD"
              return (
                <QuestionAnswer
                  onClick={() => setSelectedAnswer(answer)}
                  variant={getAnswerVariant(answer, question)}
                  disabled={Boolean(selectedAnswer)}
                  key={index}
                >
                  <span className="font-medium">{atlas.charAt(index)}</span>. {answer}
                </QuestionAnswer>
              )
            })}
          </QuestionAnswersContainer>
          {question.image && (
            <QuestionImage
              src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${question.id}.webp`}
              loading="lazy"
              alt={`Zdjęcie do pytania`}
            />
          )}
        </Question>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
