'use client'

import { createClient } from '@/lib/supabase/client'
import { ExamQuestion } from '@/types/exam-question'
import { useEffect, useRef, useState } from 'react'
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionMarker,
  questionAnswerVariants,
  QuestionImage,
} from '../ui/Question'
import { VariantProps } from 'class-variance-authority'
import { toast } from 'sonner'
import { v4 } from 'uuid'
import ExamScoreDisplay from './ExamScoreDisplay'
import { ExamScore } from '@/types/exam-score'
import { Button } from '../ui/Button'
import ExamTimer from './ExamTimer'
import ExamSkeleton from '../skeletons/ExamSkeleton'
import GoToTopBtn from './GoToTopBtn'

interface ExamProps {
  examId: number
}

export default function Exam({ examId }: ExamProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false)
  const [finalScore, setFinalScore] = useState<ExamScore | null>(null)
  const wereQuestionsFetched = useRef<boolean>(false)
  const timeStarted = useRef<string>(new Date().toISOString())

  const getQuestions = async (id: number) => {
    const supabase = createClient()
    const { data, error } = await supabase.rpc('get_random_questions', {
      amount: 40,
      exam_id: id,
    })
    if (error) {
      throw new Error(error.message)
    } else if (!data) {
      throw new Error('Błąd pobierania pytań z bazy. Spróbuj ponownie')
    } else {
      setQuestions(
        data.map((question) => {
          return {
            ...question,
            answers: question.answers.sort((a: string, b: string) => 0.5 - Math.random()),
            selected_answer: null,
            correct_selected: false,
          }
        }),
      )
      wereQuestionsFetched.current = true
    }
  }

  const setAnswer = (answer: string, question: ExamQuestion) => {
    setQuestions((prev) =>
      prev.map((el) => {
        if (el.id === question.id) {
          return {
            ...el,
            correct_selected: answer === question.correct_answer,
            selected_answer: answer === question.selected_answer ? null : answer,
          }
        } else {
          return el
        }
      }),
    )
  }

  const getAnswerVariant = (
    answer: string,
    question: ExamQuestion,
  ): VariantProps<typeof questionAnswerVariants>['variant'] => {
    if (isExamFinished) {
      if (!question.selected_answer && answer === question.correct_answer) {
        return 'unanswered'
      } else if (answer === question.correct_answer && question.selected_answer) {
        return 'correct'
      } else if (
        answer === question.selected_answer &&
        answer !== question.correct_answer
      ) {
        return 'incorrect'
      }
    } else {
      return answer === question.selected_answer ? 'selected' : 'default'
    }
  }

  const saveScore = async () => {
    const getUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        return null
      } else {
        return data.user
      }
    }

    const amountCorrect = Number(
      questions.filter((question) => question.correct_selected).length,
    )
    const amountIncorrect = Number(
      questions.filter(
        (question) => question.selected_answer && !question.correct_selected,
      ).length,
    )
    const amountUnanswered = Number(
      questions.filter((question) => !question.selected_answer).length,
    )

    const finalScore: ExamScore = {
      score_id: v4(),
      user_id: '',
      exam_id: examId,
      percentage_score: Number(((amountCorrect / questions.length) * 100).toFixed(2)),
      correct: amountCorrect,
      incorrect: amountIncorrect,
      unanswered: amountUnanswered,
      time_started: timeStarted.current,
      time_finished: new Date().toISOString(),
    }

    setFinalScore(finalScore)

    const user = await getUser()

    if (user) {
      const supabase = createClient()
      const { error } = await supabase.from('exam_scores').insert({
        ...finalScore,
        user_id: user.id,
      })
      if (error) {
        toast.error(`Błąd zapisywania wyniku: ${error.message}`)
        console.error(error)
      } else {
        toast.success('Wynik zapisany')
      }
    } else {
      toast.info('Zaloguj się, aby zapisać swój wynik')
    }
  }

  const endGame = () => {
    if (isExamFinished) {
      window.location.reload()
    } else {
      saveScore()
      setIsExamFinished(true)
    }
  }

  useEffect(() => {
    if (wereQuestionsFetched.current) return
    getQuestions(examId)
  }, [])

  useEffect(() => {
    if (finalScore) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [finalScore])

  if (questions.length > 0) {
    return (
      <div className="flex flex-col gap-8 md:w-full md:max-w-xl md:mx-auto">
        <GoToTopBtn scrollThreshold={200} />
        {!isExamFinished && (
          <ExamTimer
            toCountdownMiliseconds={3600000}
            intervalMiliseconds={100}
            onEnd={endGame}
          />
        )}
        {isExamFinished && finalScore && (
          <ExamScoreDisplay score={finalScore} questions={questions} />
        )}
        {questions.map((question, index) => {
          const atlas = 'ABCD'
          return (
            <Question id={`question-${index + 1}`} key={index}>
              <QuestionMarker>{index + 1}</QuestionMarker>
              <QuestionContent>{question.content}</QuestionContent>
              <QuestionAnswersContainer>
                {question.answers.map((answer, index) => (
                  <QuestionAnswer
                    onClick={() => setAnswer(answer, question)}
                    key={index}
                    variant={getAnswerVariant(answer, question)}
                    disabled={isExamFinished}
                  >
                    <span className="font-medium">{atlas.charAt(index)}</span>. {answer}
                  </QuestionAnswer>
                ))}
              </QuestionAnswersContainer>
              {question.image && (
                <QuestionImage
                  src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${question.id}.webp`}
                  loading="lazy"
                  alt={`Zdjęcie do pytania #${index + 1}`}
                />
              )}
            </Question>
          )
        })}
        <Button variant="primary" className="uppercase mb-4" onClick={() => endGame()}>
          {isExamFinished ? 'Spróbuj ponownie' : 'Zakończ egzamin'}
        </Button>
      </div>
    )
  } else {
    return <ExamSkeleton />
  }
}
