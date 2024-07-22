'use client'

import { useEffect, useRef, useState } from 'react'
import QuestionView from './QuestionView'
import { FlashcardView } from '@/types/flashcard-view'
import ReviewView from './ReviewView'
import Card from './Card'
import Skeleton from '../ui/Skeleton'
import { deleteKnownQuestions } from '@/app/(games)/flashcards/[code]/actions'
import { toast } from 'sonner'

interface FlashcardsProps {
  fetchedKnownQuestions: number[]
  questionIds: number[]
  examId: number
}

export default function Flashcards({
  fetchedKnownQuestions,
  questionIds,
  examId,
}: FlashcardsProps) {
  const [questionPool, setQuestionPool] = useState<number[]>([])
  const [poolAmount, setPoolAmount] = useState<number>(0)
  const [view, setView] = useState<FlashcardView | null>(null)
  const [knownQuestions, setKnownQuestions] = useState<number[]>(fetchedKnownQuestions)
  const [amountDone, setAmountDone] = useState<number>(1)

  const getQuestionPool = () => {
    const idArray = [...questionIds]
    const pool =
      knownQuestions.length > 0
        ? idArray.filter((num) => !knownQuestions.includes(num))
        : idArray
    setPoolAmount(pool.length)
    setQuestionPool(pool)
  }

  const startFromBeginning = async () => {
    setAmountDone(1)
    setKnownQuestions([])
    setQuestionPool(questionIds)
    setPoolAmount(questionIds.length)
    setView('question')
    const { error } = await deleteKnownQuestions(examId)
    if (error) {
      if (error) {
        toast.error(`Błąd w resetowaniu znanych fiszek: ${error.message}`)
        console.error(error)
      }
    } else {
      toast.success('Pomyślnie zresetowano progres w fiszkach w tej kwalifikacji')
    }
  }

  const continueWithUnknown = () => {
    setAmountDone(1)
    getQuestionPool()
    setView('question')
  }

  useEffect(() => {
    getQuestionPool()
    if (knownQuestions.length > 0) {
      setView('review')
    } else {
      setView('question')
    }
  }, [])

  switch (view) {
    case 'question':
      return (
        <>
          <p className="text-center">
            {amountDone} z {poolAmount}
          </p>
          <QuestionView
            currentQuestionId={questionPool[0] ?? null}
            questionPool={questionPool}
            setView={setView}
            setQuestionPool={setQuestionPool}
            setAmountDone={setAmountDone}
            knownQuestions={knownQuestions}
            setKnownQuestions={setKnownQuestions}
            examId={examId}
          />
        </>
      )
    case 'review':
      return (
        <ReviewView
          handleStartFromBeginning={startFromBeginning}
          handleContinue={continueWithUnknown}
          amountKnown={knownQuestions.length}
          totalQuestionsAmount={questionIds.length}
        />
      )
    default:
      return (
        <>
          <Skeleton className="w-[5ch] mx-auto h-6" />
          <Card>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-6 grow" />
              <Skeleton className="h-6 grow" />
              <Skeleton className="h-6 grow" />
            </div>
            <Skeleton className="h-[200px]" />
          </Card>
          <div className="flex gap-4">
            <Skeleton className="h-10 grow" />
            <Skeleton className="h-10 grow" />
          </div>
        </>
      )
  }
}
