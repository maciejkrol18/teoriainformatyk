"use client"

import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { SearchFilters } from "@/types/search-filters"

interface SearchFiltersDropdownProps {
  updateFn: (filter: keyof SearchFilters, value?: string) => void
  examId?: string
  sortBy?: string
  hasImage?: string
}

interface ExamData {
  id: number
  name: string
}

export default function SearchFiltersDropdown({
  updateFn,
  examId,
  sortBy,
  hasImage,
}: SearchFiltersDropdownProps) {
  const [exam, setExam] = useState<string>(examId ?? "")
  const [sorting, setSorting] = useState<string>(sortBy ?? "id")
  const [image, setImage] = useState<string>(hasImage ?? "")
  const [examData, setExamData] = useState<ExamData[] | null>(null)

  const fetchExams = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.from("exams").select("id, name")

    if (error || !data) {
      setExamData(null)
    } else {
      setExamData(data)
    }
  }

  useEffect(() => {
    updateFn("examId", exam)
  }, [exam])

  useEffect(() => {
    updateFn("sortBy", sorting)
  }, [sorting])

  useEffect(() => {
    updateFn("hasImage", image)
  }, [image])

  useEffect(() => {
    fetchExams()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SlidersHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtruj wyszukiwanie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Kwalifikacja</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={exam} onValueChange={setExam}>
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          {examData ? (
            examData.map((exam) => (
              <DropdownMenuRadioItem value={exam.id.toString()} key={exam.id}>
                {exam.name}
              </DropdownMenuRadioItem>
            ))
          ) : (
            <p className="py-1.5 pl-8 pr-2 text-sm">Ładowanie kwalifikacji...</p>
          )}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sorting} onValueChange={setSorting}>
          <DropdownMenuRadioItem value={"id"}>ID</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"content"}>Alfabetycznie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Załączony obrazek</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={image} onValueChange={setImage}>
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"true"}>Tak</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"false"}>Nie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
