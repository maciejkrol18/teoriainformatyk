'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '../ui/Button'
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionImage,
  questionAnswerVariants,
} from '../ui/Question'
import { VariantProps } from 'class-variance-authority'
import QuestionSkeleton from '../skeletons/QuestionSkeleton'
import { toast } from 'sonner'
import SessionStats from './SessionStats'
import OneQuestionBar from './OneQuestionBar'
import { Question as QuestionType } from '@/types/question'
import getUser from '@/lib/supabase/get-user'
import { getHardCollection } from '@/lib/supabase/hard-collection'

interface OneQuestionProps {
  examId: number
}

export default function OneQuestion({ examId }: OneQuestionProps) {
  const [question, setQuestion] = useState<QuestionType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [statsOpen, setStatsOpen] = useState<boolean>(false)
  const [hardCollection, setHardCollection] = useState<number[]>([])
  const [hardMode, setHardMode] = useState<boolean>(false)
  const rollButtonRef = useRef<HTMLButtonElement | null>(null)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [timesRolled, setTimesRolled] = useState(0)

  const getRandomQuestion = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.rpc('get_random_questions', {
      amount: 1,
      exam_id: examId,
      range: hardMode ? hardCollection : undefined,
    })
    if (error) {
      throw new Error(`Błąd pobierania pytania z bazy: ${error.message}`)
    } else if (!data[0]) {
      if (hardMode) {
        toast.warning(
          'Brak pasujących trudnych pytań w kolekcji. Powrót do trybu normalnego',
        )
        setHardMode(false)
      } else {
        throw new Error('Baza nie mogła znaleźć pasującego pytania. Spróbuj ponownie.')
      }
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
    question: QuestionType,
  ): VariantProps<typeof questionAnswerVariants>['variant'] => {
    if (selectedAnswer) {
      if (!selectedAnswer && answer === question.correct_answer) {
        return 'unanswered'
      } else if (answer === question.correct_answer && selectedAnswer) {
        return 'correct'
      } else if (answer === selectedAnswer && answer !== question.correct_answer) {
        return 'incorrect'
      }
    } else {
      return answer === selectedAnswer ? 'selected' : 'default'
    }
  }

  const incrementCorrect = async () => {
    setCorrectAnswers((prev) => prev + 1)
    if (userId) {
      const supabase = createClient()
      const { error } = await supabase.rpc('one_question_increment_correct', {
        user_id: userId,
        exam_id: examId,
      })
      if (error) {
        console.error(error)
        toast.error('Błąd aktualizacji statystyk')
      }
    }
  }

  const incrementIncorrect = async () => {
    setIncorrectAnswers((prev) => prev + 1)
    if (userId) {
      const supabase = createClient()
      const { error } = await supabase.rpc('one_question_increment_incorrect', {
        user_id: userId,
        exam_id: examId,
      })
      if (error) {
        console.error(error)
        toast.error('Błąd aktualizacji statystyk')
      }
    }
  }

  useEffect(() => {
    if (question && selectedAnswer) {
      if (selectedAnswer === question.correct_answer) {
        incrementCorrect()
      } else {
        incrementIncorrect()
      }
    }
  }, [selectedAnswer])

  useEffect(() => {
    const rollOnSpaceClick = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (rollButtonRef.current) rollButtonRef.current.blur()
        rollQuestion()
      }
    }

    window.addEventListener('keyup', rollOnSpaceClick)

    return () => window.removeEventListener('keyup', rollOnSpaceClick)
  }, [hardMode, hardCollection])

  useEffect(() => {
    rollQuestion()
  }, [hardMode])

  useEffect(() => {
    const getUserData = async () => {
      const { user } = await getUser()
      const collection = await getHardCollection()
      setUserId(user && user.id)
      setHardCollection(collection ?? [])
    }
    getUserData()
  }, [])

  return (
    <div className="flex flex-col grow gap-8 justify-center lg:justify-between pb-[64px] lg:py-4 md:w-full md:max-w-xl md:mx-auto">
      <Button
        onClick={() => rollQuestion()}
        variant="primary"
        className="font-semibold uppercase w-full hidden lg:flex flex-col"
        ref={rollButtonRef}
      >
        {selectedAnswer ? 'Następne' : 'Losuj'} (Spacja)
      </Button>
      {question ? (
        <Question className="bg-transparent">
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionAnswersContainer>
            {question.answers.map((answer, index) => {
              const atlas = 'ABCD'
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
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/question_images/${question.id}.webp`}
              loading="lazy"
              alt={`Zdjęcie do pytania`}
            />
          )}
        </Question>
      ) : (
        <QuestionSkeleton />
      )}
      <OneQuestionBar
        openStatsFn={() => setStatsOpen(true)}
        rollQuestionFn={rollQuestion}
        hardModeFn={setHardMode}
        hardMode={hardMode}
        hardCollection={hardCollection}
        setHardCollection={setHardCollection}
        currentQuestion={question}
        userId={userId}
      />
      <SessionStats
        open={statsOpen}
        onOpenChange={(open) => setStatsOpen(open)}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        timesRolled={timesRolled}
      />
    </div>
  )
}
