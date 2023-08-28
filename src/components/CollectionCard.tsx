import { Question } from "@/types/question"
import Card from "./Card"
import { cn } from "@/lib/utils"

interface CollectionCardProps {
  collectionType: "easy" | "hard"
  question: Question
}

export default function CollectionCard({
  collectionType,
  question,
}: CollectionCardProps) {
  console.log("collection card")
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <span className="text-secondary-300">#{question.id}</span>
        <h1 className="text-lg font-semibold">{question.content}</h1>
      </div>
      <div className="flex flex-col gap-2">
        {question.answers.map((answer, idx) => {
          const letters = "abcd"
          return (
            <div
              className={cn("flex gap-2 bg-secondary-300 p-2 drop-shadow-lg", {
                "bg-positive-light": answer === question.correct_answer,
              })}
              key={idx}
            >
              <span className="uppercase font-semibold">{letters.at(idx)}.</span>
              <span className="text-left">{answer}</span>
            </div>
          )
        })}
      </div>
      {question.image && <img src={question.image}></img>}
    </Card>
  )
}
