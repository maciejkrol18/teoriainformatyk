"use client"

import { Search } from "lucide-react"
import { useRef } from "react"
import SearchFiltersDropdown from "./SearchFiltersDropdown"
import SearchInput from "./SearchInput"

interface SearchBarProps {
  examId?: string
  sortBy?: string
  hasImage?: string
}

export default function SearchBar({ examId, hasImage, sortBy }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div
      className="flex justify-between gap-2 p-4 rounded-full bg-background-light text-muted hover:cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <Search />
      <SearchInput inputRef={inputRef} />
      <SearchFiltersDropdown />
    </div>
  )
}
