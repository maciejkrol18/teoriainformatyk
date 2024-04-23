"use client"

import { createClient } from "@/lib/supabase/client"
import { ExamQuestion } from "@/types/exam-question"
import { useEffect, useRef, useState } from "react"
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionMarker,
  questionAnswerVariants,
  QuestionImage,
} from "../ui/Question"
import { VariantProps } from "class-variance-authority"

interface ExamProps {
  examId: number
}

export default function Exam({ examId }: ExamProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false)
  const wereQuestionsFetched = useRef<boolean>(false)

  const getQuestions = async (id: number) => {
    const supabase = createClient()
    const { data, error } = await supabase.rpc("get_random_questions", {
      amount: 40,
      exam_id: id,
    })
    if (error) {
      throw new Error(error.message)
    } else if (!data) {
      throw new Error("Błąd pobierania pytań z bazy. Spróbuj ponownie")
    } else {
      setQuestions(
        data.map((question) => {
          return {
            ...question,
            // Although 'a' and 'b' variables are unused, they have to be typed to avoid compile errors
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
  ): VariantProps<typeof questionAnswerVariants>["variant"] => {
    if (isExamFinished) {
      if (!question.selected_answer && answer === question.correct_answer) {
        return "unanswered"
      } else if (answer === question.correct_answer && question.selected_answer) {
        return "correct"
      } else if (
        answer === question.selected_answer &&
        answer !== question.correct_answer
      ) {
        return "incorrect"
      }
    } else {
      return answer === question.selected_answer ? "selected" : "default"
    }
  }

  const endGame = () => {
    if (isExamFinished) {
      window.location.reload()
    } else {
      setIsExamFinished(true)
    }
  }

  useEffect(() => {
    if (wereQuestionsFetched.current) return
    getQuestions(examId)
  }, [])

  if (questions.length > 0) {
    return (
      <div className="flex flex-col gap-8 max-w-xl mx-auto">
        <button onClick={() => setIsExamFinished((prev) => !prev)}>End game</button>
        {questions.map((question, index) => {
          const atlas = ["A", "B", "C", "D"]
          return (
            <Question id={`question-${index + 1}`}>
              <QuestionMarker>{index + 1}</QuestionMarker>
              <QuestionContent>{question.content}</QuestionContent>
              <QuestionAnswersContainer>
                {question.answers.map((answer, index) => (
                  <QuestionAnswer
                    onClick={() => setAnswer(answer, question)}
                    key={index}
                    variant={getAnswerVariant(answer, question)}
                  >
                    <span className="font-medium">{atlas[index]}</span>. {answer}
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
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}
