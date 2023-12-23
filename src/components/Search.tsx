"use client"
import { supabase, supabaseUrl } from "@/lib/supabase"
import { Question } from "@/types/question"
import { Table } from "@/types/table"
import { useState } from "react"
import Card from "./ui/Card"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Search() {
  const [inf02Results, setInf02Results] = useState<Question[] | null>(null)
  const [inf03Results, setInf03Results] = useState<Question[] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const getSearchResults = async (query: string, table: Table) => {
    const { data, error } = await supabase
      .from(table)
      .select("answers, content, correct_answer, id, image")
      .textSearch("content", query, {
        type: "websearch",
      })

    if (error) {
      console.warn(error)
    }

    return data
  }

  const search = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setInf02Results(null)
    setInf03Results(null)

    const inf02 = await getSearchResults(searchQuery, "inf02")
    const inf03 = await getSearchResults(searchQuery, "inf03")

    setInf02Results(inf02)
    setInf03Results(inf03)
    setIsSearching(false)
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={(e) => search(e)}>
        <input
          className="bg-primary placeholder:text-secondary-300 shadow-card-inset rounded-md p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Wpisz treść pytania"
        />
        <button className="bg-accent-purple text-lg font-bold shadow-card-inset rounded-lg px-4 py-2 uppercase">
          Szukaj
        </button>
      </form>
      {isSearching && (
        <p className="text-semibold text-center py-8">Trwa wyszukiwanie...</p>
      )}
      {inf02Results && (
        <div className="flex flex-col gap-4 py-8">
          <h1 className="py-4 text-xl font-semibold border-secondary-300 border-b-[1px]">
            INF.02 - {inf02Results.length}
          </h1>
          <div className="flex flex-col gap-4">
            {inf02Results && inf02Results.length > 0 ? (
              inf02Results.map((question, idx) => (
                <Card key={idx}>
                  <div className="flex flex-col gap-2">
                    <span className="text-secondary-300">#{question.id}</span>
                    <h1 className="text-lg font-semibold">{question.content}</h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {question.answers.map((answer, idx) => {
                      const letters = "abcd"
                      return (
                        <div
                          className={cn(
                            "flex gap-2 bg-secondary-300 p-2 drop-shadow-lg",
                            {
                              "bg-positive-light": answer === question.correct_answer,
                            },
                          )}
                          key={idx}
                        >
                          <span className="uppercase font-semibold">
                            {letters.at(idx)}.
                          </span>
                          <span className="text-left">{answer}</span>
                        </div>
                      )
                    })}
                  </div>
                  {question.image && (
                    <Image
                      src={`${supabaseUrl}/storage/v1/object/public/questions_inf02_images/${question.id}.webp`}
                      alt="Obrazek załączony do pytania"
                      width={500}
                      height={200}
                    />
                  )}
                </Card>
              ))
            ) : inf02Results && inf02Results.length === 0 ? (
              <p>Nie znaleziono pytań pasujących do twojego wyszukiwania</p>
            ) : null}
          </div>
        </div>
      )}
      {inf03Results && (
        <div className="flex flex-col gap-4 py-8">
          <h2 className="py-4 text-xl font-semibold border-secondary-300 border-b-[1px]">
            INF.03 - {inf03Results.length}
          </h2>
          <div className="flex flex-col gap-4">
            {inf03Results && inf03Results.length > 0 ? (
              inf03Results.map((question, idx) => (
                <Card key={idx}>
                  <div className="flex flex-col gap-2">
                    <span className="text-secondary-300">#{question.id}</span>
                    <h1 className="text-lg font-semibold">{question.content}</h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {question.answers.map((answer, idx) => {
                      const letters = "abcd"
                      return (
                        <div
                          className={cn(
                            "flex gap-2 bg-secondary-300 p-2 drop-shadow-lg",
                            {
                              "bg-positive-light": answer === question.correct_answer,
                            },
                          )}
                          key={idx}
                        >
                          <span className="uppercase font-semibold">
                            {letters.at(idx)}.
                          </span>
                          <span className="text-left">{answer}</span>
                        </div>
                      )
                    })}
                  </div>
                  {question.image && (
                    <Image
                      src={`${supabaseUrl}/storage/v1/object/public/questions_inf03_images/${question.id}.webp`}
                      alt="Obrazek załączony do pytania"
                      width={500}
                      height={200}
                    />
                  )}
                </Card>
              ))
            ) : inf03Results && inf03Results.length === 0 ? (
              <p>Nie znaleziono pytań pasujących do twojego wyszukiwania</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
