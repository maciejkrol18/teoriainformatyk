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
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchFilters } from "@/types/search-filters"

interface ExamData {
  id: number
  name: string
}

export default function SearchFiltersDropdown() {
  const [examData, setExamData] = useState<ExamData[] | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleFilterChange = (filter: keyof SearchFilters, value?: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }
    params.set("page", "1")
    replace(`${pathname}?${params.toString()}`)
  }

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
        <DropdownMenuRadioGroup
          value={searchParams.get("examId") || ""}
          onValueChange={(value) => handleFilterChange("examId", value)}
        >
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
        <DropdownMenuRadioGroup
          value={searchParams.get("sortBy") || "id"}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
        >
          <DropdownMenuRadioItem value={"id"}>ID</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"content"}>Alfabetycznie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Załączony obrazek</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={searchParams.get("hasImage") || ""}
          onValueChange={(value) => handleFilterChange("hasImage", value)}
        >
          <DropdownMenuRadioItem value={""}>Wszystkie</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"true"}>Tak</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"false"}>Nie</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
