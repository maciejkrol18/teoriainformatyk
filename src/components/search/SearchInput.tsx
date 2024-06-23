"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

interface SearchInputProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

export default function SearchInput({ inputRef }: SearchInputProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearchQuery = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  return (
    <input
      type="text"
      onChange={(e) => handleSearchQuery(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      ref={inputRef}
      placeholder="Szukaj wg. treści pytania"
      className="bg-transparent grow"
    />
  )
}
