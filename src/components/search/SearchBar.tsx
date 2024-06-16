"use client"

import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import SearchFiltersDropdown from "./SearchFiltersDropdown"
import SearchInput from "./SearchInput"
import { SearchFilters } from "@/types/search-filters"

interface SearchBarProps {
  query?: string
  examId?: string
  sortBy?: string
  hasImage?: string
}

export default function SearchBar({ query, examId, hasImage, sortBy }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const updateSearchFilter = (filter: keyof SearchFilters, value?: string) => {
    const currentUrl = new URLSearchParams(Array.from(searchParams.entries()))
    if (!value) {
      currentUrl.delete(filter)
    } else {
      currentUrl.set(filter, value)
    }
    const search = currentUrl.toString()
    const searchQuery = search ? `?${search}` : ""
    router.push(`${pathname}${searchQuery}`)
  }

  return (
    <div
      className="flex justify-between p-4 w-[512px] mx-auto rounded-full bg-background-light text-muted hover:cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex gap-2 grow items-center">
        <Search />
        <SearchInput query={query} inputRef={inputRef} updateFn={updateSearchFilter} />
      </div>
      <SearchFiltersDropdown
        updateFn={updateSearchFilter}
        examId={examId}
        sortBy={sortBy}
        hasImage={hasImage}
      />
    </div>
  )
}
