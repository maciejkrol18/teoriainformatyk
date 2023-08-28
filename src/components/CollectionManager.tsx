"use client"
import * as Accordion from "@radix-ui/react-accordion"
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { getCollection } from "@/lib/utils"
import CollectionCard from "./CollectionCard"
import { Question } from "@/types/question"
import { supabase } from "@/lib/supabase"

interface CollectionManagerProps {
  collectionType: "easy" | "hard"
}

export default function CollectionManager({ collectionType }: CollectionManagerProps) {
  const [firstCollection, setFirstCollection] = React.useState<Question[] | undefined>([])
  const [secondCollection, setSecondCollection] = React.useState<Question[] | undefined>(
    [],
  )

  const fetchFromSupabase = async (
    idList: number[],
    table: "questions_inf02" | "questions_inf03",
  ) => {
    const { data, error } = await supabase
      .from(table)
      .select("answers, content, correct_answer, id, image")
      .filter("id", "in", `(${idList.join(",")})`)

    if (error) {
      console.log(error)
      return
    }

    if (data === undefined) {
      throw new Error("Supabase returned undefined")
    }

    return data
  }

  React.useEffect(() => {
    const setCollections = async () => {
      let inf02: number[], inf03: number[]
      if (collectionType === "easy") {
        inf02 = getCollection("questions_inf02_easy")
        inf03 = getCollection("questions_inf03_easy")
      } else {
        inf02 = getCollection("questions_inf02_hard")
        inf03 = getCollection("questions_inf03_hard")
      }
      const firstCollection = await fetchFromSupabase(inf02, "questions_inf02")
      const secondCollection = await fetchFromSupabase(inf03, "questions_inf03")
      setFirstCollection(firstCollection)
      setSecondCollection(secondCollection)
    }
    setCollections()
  }, [])

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="inf-02">
        <Accordion.Trigger>
          <div className="flex justify-between">
            <p>INF0.2</p>
            <ChevronDown />
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="py-2 flex flex-col gap-4">
            {firstCollection && firstCollection.length > 0 ? (
              firstCollection.map((question, idx) => {
                console.log(question, idx)
                return (
                  <CollectionCard
                    collectionType={collectionType}
                    question={question}
                    key={idx}
                  />
                )
              })
            ) : (
              <p>Brak pytań w kolekcji</p>
            )}
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="inf-03">
        <Accordion.Trigger>
          <div className="flex justify-between">
            <p>INF0.3</p>
            <ChevronDown />
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="py-2 flex flex-col gap-4">
            {secondCollection && secondCollection.length > 0 ? (
              secondCollection.map((question, idx) => {
                console.log(question, idx)
                return (
                  <CollectionCard
                    collectionType={collectionType}
                    question={question}
                    key={idx}
                  />
                )
              })
            ) : (
              <p>Brak pytań w kolekcji</p>
            )}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
