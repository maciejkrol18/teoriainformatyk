"use client"

import { createClient } from "@/lib/supabase/client"
import { SetStateAction, useEffect, useState } from "react"
import Card from "./Card"
import { Button } from "../ui/Button"
import { FlashcardView } from "@/types/flashcard-view"
import { QuestionImage } from "../ui/Question"
import Skeleton from "../ui/Skeleton"

interface QuestionViewProps {
  currentQuestionId: number | null
  questionPool: number[]
  setQuestionPool: React.Dispatch<SetStateAction<number[]>>
  setView: React.Dispatch<SetStateAction<FlashcardView | null>>
  setAmountDone: React.Dispatch<SetStateAction<number>>
  knownQuestions: number[]
  setKnownQuestions: React.Dispatch<SetStateAction<number[]>>
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
  knownQuestions,
  setKnownQuestions,
}: QuestionViewProps) {
  const [question, setQuestion] = useState<FlashcardQuestion | null>(null)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      setShowAnswer(false)
      setQuestion(null)
      if (!currentQuestionId) {
        console.log(
          "fetchQuestion - current question falsy, setting to review",
          currentQuestionId,
        )
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
      if (questionPool[questionPool.indexOf(currentQuestionId) + 1]) {
        setAmountDone((prev) => prev + 1)
      }
    }
    setQuestionPool((prev) => prev.slice(1))
  }

  const handleKnowQuestion = () => {
    if (currentQuestionId) {
      setKnownQuestions((prev) => [currentQuestionId, ...prev])
    }
    goToNextInPool()
  }

  const handleDontKnowQuestion = () => {
    if (currentQuestionId && knownQuestions.includes(currentQuestionId)) {
      setKnownQuestions((prev) => prev.filter((num) => num !== currentQuestionId))
    }
    goToNextInPool()
  }

  return (
    <>
      <Card onClick={() => setShowAnswer((prev) => !prev)} className="cursor-pointer">
        {question && (
          <p className="text-xl font-semibold leading-relaxed">
            {showAnswer ? question.correct_answer : question.content}
          </p>
        )}
        {question && currentQuestionId && !showAnswer && (
          <QuestionImage
            src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${currentQuestionId}.webp`}
            alt="Zdjęcie załączone do pytania"
            loading="lazy"
          />
        )}
        {!question && (
          <>
            <p className="text-2xl text-red-600">QUESTION VIEW LOADING</p>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-6 grow" />
              <Skeleton className="h-6 grow" />
              <Skeleton className="h-6 grow" />
            </div>
            <Skeleton className="h-[200px]" />
          </>
        )}
      </Card>
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="grow" onClick={handleDontKnowQuestion} disabled={!question}>
          Nie umiem
        </Button>
        <Button className="grow" onClick={handleKnowQuestion} disabled={!question}>
          Umiem
        </Button>
      </div>
    </>
  )
}
