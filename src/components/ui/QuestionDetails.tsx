import { Question } from "@/types/question"
import { Layers, Image, Type, Skull, LucideAlertTriangle } from "lucide-react"
import { QuestionAnswer, QuestionAnswersContainer, QuestionImage } from "./Question"
import { Button } from "./Button"

interface QuestionDetailsProps {
  question: Question
}

const Divider = () => <div className="h-[2px] bg-background-bright" />

export default function QuestionDetails({ question }: QuestionDetailsProps) {
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
              <QuestionAnswer key={answer} className="cursor-default">
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
        <Button>
          <Skull /> Dodaj do zbioru trudnych
        </Button>
        <Button>
          <LucideAlertTriangle /> Zgłoś błąd
        </Button>
      </div>
    </div>
  )
}
