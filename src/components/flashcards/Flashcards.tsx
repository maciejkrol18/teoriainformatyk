"use client"

import { useEffect, useState } from "react"
import QuestionView from "./QuestionView"
import { FlashcardView } from "@/types/flashcard-view"

interface FlashcardsProps {
  fetchedKnownQuestions: number[]
  questionIds: number[]
}

export default function Flashcards({
  fetchedKnownQuestions,
  questionIds,
}: FlashcardsProps) {
  const [questionPool, setQuestionPool] = useState<number[]>([])
  const [view, setView] = useState<FlashcardView | null>(null)
  const [knownQuestions, setKnownQuestions] = useState<number[]>(fetchedKnownQuestions)
  const [amountDone, setAmountDone] = useState<number>(1)

  const getQuestionPool = () => {
    const idArray = [...questionIds]
    return knownQuestions.length > 0
      ? idArray.filter((num) => !knownQuestions.includes(num))
      : idArray
  }

  useEffect(() => {
    setQuestionPool(getQuestionPool())
  }, [])

  useEffect(() => {
    if (questionPool.length > 0) {
      if (knownQuestions.length > 0) {
        if (knownQuestions.length === questionIds.length) {
          setView("completed")
        } else {
          setView("review")
        }
      } else {
        setView("question")
      }
    }
  }, [questionPool])

  if (questionPool.length > 0) {
    switch (view) {
      case "question":
        console.log("switch - question")
        return (
          <>
            <p className="text-center">
              {amountDone} z {questionIds.length}
            </p>
            <QuestionView
              currentQuestionId={questionPool[0] ?? null}
              questionPool={questionPool}
              setView={setView}
              setQuestionPool={setQuestionPool}
              setAmountDone={setAmountDone}
            />
          </>
        )
      case "completed":
        return <p>Completed</p>
      case "review":
        return <p>Review</p>
      default:
        return <p>Loading...</p>
    }
  } else {
    return <p>Loading...</p>
  }
}
