"use client"
import { LegacyQuestion } from "@/types/legacy-question"
import Card from "../ui/Card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Table } from "@/types/table"
import { supabaseUrl } from "@/lib/supabase"
import AnswerBox from "../ui/AnswerBox"

interface CollectionCardProps {
  table: Table
  question: LegacyQuestion
  setCollection: React.Dispatch<React.SetStateAction<LegacyQuestion[] | undefined>>
}

export default function CollectionCard({
  table,
  question,
  setCollection,
}: CollectionCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-secondary-300">#{question.id}</span>
          <button
            onClick={() => setCollection((prev) => prev?.filter((el) => el !== question))}
            className="py-2 px-4 rounded-md hover:bg-secondary-300"
          >
            Usuń
          </button>
        </div>
        <h1 className="text-lg font-semibold">{question.content}</h1>
      </div>
      <div className="flex flex-col gap-2">
        {question.answers.map((answer, idx) => {
          const letters = "abcd"
          return (
            <AnswerBox
              className={cn({
                "bg-positive-light": answer === question.correct_answer,
              })}
              content={answer}
              marker={letters.at(idx) as string}
              key={idx}
            />
          )
        })}
      </div>
      {question.image && (
        <Image
          src={`${supabaseUrl}/storage/v1/object/public/${table}_images/${question.id}.webp`}
          alt="Obrazek załączony do pytania"
          width={500}
          height={200}
        />
      )}
    </Card>
  )
}
