"use client"

import { Question } from "@/types/question"
import { Layers, Image, Type, Skull, LucideAlertTriangle } from "lucide-react"
import {
  QuestionAnswer,
  QuestionAnswersContainer,
  QuestionImage,
  questionAnswerVariants,
} from "./Question"
import { Button } from "./Button"
import { VariantProps } from "class-variance-authority"
import {
  addToHardCollection,
  getHardCollection,
  removeFromHardCollection,
} from "@/lib/supabase/hard-collection"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import getUser from "@/lib/supabase/get-user"

interface QuestionDetailsProps {
  question: Question
  showHardCollectionButton?: boolean
}

const Divider = () => <div className="h-[2px] bg-background-bright" />

export default function QuestionDetails({
  question,
  showHardCollectionButton = true,
}: QuestionDetailsProps) {
  const getAnswerVariant = (
    answer: string,
    question: Question,
  ): VariantProps<typeof questionAnswerVariants>["variant"] => {
    return answer === question.correct_answer ? "correct" : "default"
  }

  const [hardCollection, setHardCollection] = useState<number[] | null>(null)
  const [isInCollection, setIsInCollection] = useState<boolean>(false)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false)

  const fetchData = async () => {
    const hardCollection = (await getHardCollection()) ?? []
    setHardCollection(hardCollection)
  }

  const fetchUser = async () => {
    const { user } = await getUser()
    setIsUserAuthenticated(Boolean(user))
  }

  // TODO: Unify this logic with what's in OneQuestionBar.tsx
  const handleHardCollectionClick = async () => {
    if (!isUserAuthenticated) {
      toast.error("Zaloguj się, aby korzystać z tej funkcji")
      return
    }
    if (hardCollection) {
      if (isInCollection) {
        setHardCollection((prev) => (prev ?? []).filter((id) => id !== question.id))
        const data = await removeFromHardCollection(question.id)
        if (data) {
          toast.success(`Usunięto ID ${question.id} ze zbioru`)
        }
      } else {
        setHardCollection((prev) => (prev ? [question.id, ...prev] : [question.id]))
        const data = await addToHardCollection(question.id)
        if (data) {
          toast.success(`Dodano ID ${question.id} do zbioru`)
        }
      }
    }
  }

  useEffect(() => {
    fetchData()
    fetchUser()
  }, [])

  useEffect(() => {
    if (hardCollection) {
      setIsInCollection(hardCollection.includes(question.id))
    }
  }, [hardCollection])

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Type />
          Treść
        </p>
        <p>{question.content}</p>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Layers />
          Odpowiedzi
        </p>
        <QuestionAnswersContainer>
          {question.answers.map((answer, index) => {
            const atlas = "ABCD"
            return (
              <QuestionAnswer
                key={answer}
                className="cursor-default"
                variant={getAnswerVariant(answer, question)}
              >
                <span className="font-medium">{atlas.charAt(index)}</span>. {answer}
              </QuestionAnswer>
            )
          })}
        </QuestionAnswersContainer>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 font-semibold">
          <Image />
          Załączony obrazek
        </p>
        {question.image ? (
          <QuestionImage
            src={`https://mwutwmvvmskygvtjowaa.supabase.co/storage/v1/object/public/question_images/${question.id}.webp`}
            loading="lazy"
            alt={`Zdjęcie do pytania o ID ${question.id}`}
          />
        ) : (
          <p className="text-muted">To pytanie nie posiada załączonego obrazku</p>
        )}
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        {showHardCollectionButton && (
          <Button
            onClick={handleHardCollectionClick}
            disabled={!hardCollection}
            className={`${!hardCollection && "text-muted"}`}
          >
            <Skull />{" "}
            {hardCollection
              ? `${isInCollection ? "Usuń ze" : "Dodaj do"} zbioru trudnych pytań`
              : "Ładowanie stanu zbioru..."}
          </Button>
        )}
        <Button>
          <LucideAlertTriangle /> Zgłoś błąd
        </Button>
      </div>
    </div>
  )
}
