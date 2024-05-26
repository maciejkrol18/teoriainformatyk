"use client"

import { supabaseUrl } from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"
import Card from "./ui/Card"
import { cn } from "@/lib/utils"
import SessionStats from "./SessionStats"
import AnswerBox from "./ui/AnswerBox"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/types/database"
import { Button } from "./ui/Button"
import {
  Question,
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionContent,
  QuestionImage,
  questionAnswerVariants,
} from "./ui/Question"
import { VariantProps } from "class-variance-authority"
import { Dices, HelpCircle, Skull, Smile } from "lucide-react"
import QuestionSkeleton from "./skeletons/QuestionSkeleton"
import { toast } from "sonner"

interface OneQuestionProps {
  examId: number
}

type Question = Database["public"]["Tables"]["questions"]["Row"]

export default function OneQuestion({ examId }: OneQuestionProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const rollButtonRef = useRef<HTMLButtonElement | null>(null)
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

  const incrementCorrect = async () => {
    setCorrectAnswers((prev) => prev + 1)
    if (userId) {
      const supabase = createClient()
      const { error } = await supabase.rpc("one_question_increment_correct", {
        user_id: userId,
        exam_id: examId,
      })
      if (error) {
        console.error(error)
        toast.error("Błąd aktualizacji statystyk")
      }
    }
  }

  const incrementIncorrect = async () => {
    setIncorrectAnswers((prev) => prev + 1)
    if (userId) {
      const supabase = createClient()
      const { error } = await supabase.rpc("one_question_increment_incorrect", {
        user_id: userId,
        exam_id: examId,
      })
      if (error) {
        console.error(error)
        toast.error("Błąd aktualizacji statystyk")
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
    if (wasEventListenerInitialized.current) return

    const counterInterval = setInterval(() => setCounter((prev) => prev + 1), 1000)

    const supabase = createClient()
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        setUserId(null)
      } else {
        setUserId(data.user.id)
      }
    }
    getUser()

    getRandomQuestion()

    const rollOnSpaceClick = (e: KeyboardEvent) => {
      if (rollButtonRef.current) rollButtonRef.current.blur()
      if (e.code === "Space") {
        rollQuestion()
      }
    }
    window.addEventListener("keyup", (e) => rollOnSpaceClick(e))
    wasEventListenerInitialized.current = true

    return () => {
      clearInterval(counterInterval)
      window.removeEventListener("keyup", (e) => rollOnSpaceClick(e))
    }
  }, [])

  return (
    <div className="flex flex-col grow gap-8 justify-center lg:justify-between py-[56px] md:w-full md:max-w-xl md:mx-auto">
      <div className="flex justify-between fixed bottom-0 left-0 w-full z-50 lg:hidden bg-[#0b0a0aed] px-4 py-4 backdrop-blur-xl">
        <button
          onClick={() =>
            alert("To byłby przycisk od przełączania między trybem domyślnym i trudnym")
          }
        >
          <div className="w-4 h-4 bg-primary rounded-full"></div>
        </button>
        <button
          onClick={() =>
            alert("To byłby przycisk od dodawania do kolekcji łatwych pytań")
          }
        >
          <Smile />
        </button>
        <button
          onClick={() =>
            alert("To byłby przycisk od dodawania do kolekcji trudnych pytań")
          }
        >
          <Skull />
        </button>
        <button
          onClick={() => alert("To byłby przycisk od wyświetlania wyjaśnienia pytania")}
        >
          <HelpCircle />
        </button>
        <button onClick={() => rollQuestion()}>
          <Dices />
        </button>
      </div>
      <Button
        onClick={() => rollQuestion()}
        variant="primary"
        className="font-semibold uppercase w-full hidden lg:flex flex-col"
        ref={rollButtonRef}
      >
        {selectedAnswer ? "Następne" : "Losuj"} (Spacja)
      </Button>
      {question ? (
        <Question className="bg-transparent">
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
        <QuestionSkeleton />
      )}
      <div className="hidden lg:flex items-center justify-center gap-4">
        <Button
          onClick={() =>
            alert("To byłby przycisk od przełączania między trybem domyślnym i trudnym")
          }
          className="rounded-full w-14 h-14"
        >
          <div className="w-4 h-4 bg-primary rounded-full"></div>
        </Button>
        <Button
          onClick={() =>
            alert("To byłby przycisk od dodawania do kolekcji łatwych pytań")
          }
          className="w-14 h-14 rounded-full"
        >
          <Smile className="w-7 h-7" />
        </Button>
        <Button
          onClick={() =>
            alert("To byłby przycisk od dodawania do kolekcji trudnych pytań")
          }
          className="w-14 h-14 rounded-full"
        >
          <Skull className="w-7 h-7" />
        </Button>
        <Button
          onClick={() => alert("To byłby przycisk od wyświetlania wyjaśnienia pytania")}
          className="w-14 h-14 rounded-full"
        >
          <HelpCircle className="w-7 h-7" />
        </Button>
      </div>
    </div>
  )
}
