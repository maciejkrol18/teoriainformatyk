'use client'

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
import { saveScore } from '@/app/(games)/exam/[code]/actions'

interface ExamProps {
  examId: number
  fetchedQuestions: ExamQuestion[]
}

export default function Exam({ examId, fetchedQuestions }: ExamProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>(fetchedQuestions)
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false)
  const [finalScore, setFinalScore] = useState<ExamScore | null>(null)
  const timeStarted = useRef<string>(new Date().toISOString())

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

  const setScore = async () => {
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

    const data = await saveScore(finalScore)

    if (data.error) {
      toast.error(data.message)
      console.error(data.message)
    } else {
      toast.info(data.message)
    }
  }

  const endGame = () => {
    if (isExamFinished) {
      window.location.reload()
    } else {
      setScore()
      setIsExamFinished(true)
    }
  }

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
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/question_images/${question.id}.webp`}
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
