"use client"

import { createClient } from "@/lib/supabase/client"
import { SetStateAction, useEffect, useState } from "react"
import Card from "./Card"
import { Button } from "../ui/Button"
import { FlashcardView } from "@/types/flashcard-view"
import { QuestionImage } from "../ui/Question"

interface QuestionViewProps {
  currentQuestionId: number | null
  questionPool: number[]
  setQuestionPool: React.Dispatch<SetStateAction<number[]>>
  setView: React.Dispatch<SetStateAction<FlashcardView | null>>
  setAmountDone: React.Dispatch<SetStateAction<number>>
}

interface FlashcardQuestion {
  content: string
  correct_answer: string
  image: boolean
}

export default function QuestionView({
  currentQuestionId,
  questionPool,
  setQuestionPool,
  setView,
  setAmountDone,
}: QuestionViewProps) {
  const [question, setQuestion] = useState<FlashcardQuestion | null>(null)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      setShowAnswer(false)
      setQuestion(null)
      if (!currentQuestionId) {
        setView("review")
        return
      }

      const supabase = createClient()

      const { data, error } = await supabase
        .from("questions")
        .select("content, correct_answer, image")
        .eq("id", currentQuestionId)
        .single()

      if (!data || error) {
        throw new Error("Failed to fetch the question")
      } else {
        setQuestion(data)
      }
    }
    fetchQuestion()
  }, [currentQuestionId])

  const goToNextInPool = () => {
    if (currentQuestionId) {
      const nextQuestion = questionPool[questionPool.indexOf(currentQuestionId) + 1]
      if (nextQuestion) {
        setAmountDone((prev) => prev + 1)
        setQuestionPool((prev) => prev.slice(1))
      } else {
        setView("review")
      }
    }
  }

  return (
    <>
      <Card onClick={() => setShowAnswer((prev) => !prev)} className="cursor-pointer">
        {question && (
          <p className="text-xl font-semibold leading-relaxed">
            {showAnswer ? question.correct_answer : question.content}
          </p>
        )}
        {question && !showAnswer && (
          <QuestionImage
            src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${currentQuestionId}.webp`}
            alt="Zdjęcie załączone do pytania"
            loading="eager"
          />
        )}
        {!question && <p>Ładowanie...</p>}
      </Card>
      <div className="flex gap-4">
        <Button className="grow" onClick={goToNextInPool}>
          Nie umiem
        </Button>
        <Button className="grow" onClick={goToNextInPool}>
          Umiem
        </Button>
      </div>
    </>
  )
}
