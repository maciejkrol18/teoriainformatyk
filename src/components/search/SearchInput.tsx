"use client"

import { SearchFilters } from "@/types/search-filters"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

interface SearchInputProps {
  query?: string
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  updateFn: (filter: keyof SearchFilters, value?: string) => void
}

export default function SearchInput({ query, inputRef, updateFn }: SearchInputProps) {
  const [text, setText] = useState(query)
  const [debouncedQuery] = useDebounce(text, 200)

  useEffect(() => {
    updateFn("query", debouncedQuery)
  }, [debouncedQuery])
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      ref={inputRef}
      placeholder="Szukaj wg. treści pytania"
      className="bg-transparent"
    />
  )
}
