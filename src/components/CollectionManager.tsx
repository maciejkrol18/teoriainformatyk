"use client"
import { supabase } from "@/lib/supabase"
import { getCollection } from "@/lib/utils"
import { Question } from "@/types/question"
import { Table } from "@/types/table"
import { useState, useEffect } from "react"
import CollectionCard from "./CollectionCard"
import { ChevronDown } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"

interface CollectionManagerProps {
  title: string
  storageKey: string
  table: Table
}

export default function CollectionManager({
  title,
  storageKey,
  table,
}: CollectionManagerProps) {
  const [questionArray, setQuestionArray] = useState<Question[] | undefined>(undefined)

  useEffect(() => {
    const getQuestions = async () => {
      const idList = getCollection(storageKey)
      const { data, error } = await supabase
        .from(table)
        .select("answers, content, correct_answer, id, image")
        .filter("id", "in", `(${idList.join(",")})`)

      if (error) {
        console.error(error)
        throw new Error(
          "Błąd bazy danych. Sprawdź konsolę przeglądarki po więcej szczegółów",
        )
      }

      if (data === undefined) {
        throw new Error("Błąd w pobieraniu danych z bazy. Spróbuj ponownie")
      }

      setQuestionArray(data)
    }
    getQuestions()
  }, [])

  useEffect(() => {
    if (questionArray) {
      localStorage.setItem(
        storageKey,
        JSON.stringify(questionArray.map((question) => question.id)),
      )
    }
  }, [questionArray])

  return (
    <Accordion.Item value={title}>
      <Accordion.Header>
        <Accordion.Trigger className="w-full group">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">{title}</p>
            <ChevronDown className="text-secondary-300 group-data-[state='open']:rotate-180" />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        <div className="flex flex-col gap-4 py-4">
          {questionArray && questionArray.length > 0 ? (
            questionArray.map((question, idx) => (
              <CollectionCard
                key={idx}
                question={question}
                setCollection={setQuestionArray}
              />
            ))
          ) : (
            <p>Brak pytań w tej kolekcji</p>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
