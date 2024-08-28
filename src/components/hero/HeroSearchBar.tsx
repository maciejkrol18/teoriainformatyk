'use client'

import { Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()

  return (
    <form
      className="flex justify-between gap-2 p-4 rounded-full bg-background-light text-muted hover:cursor-text max-w-[512px] mx-auto"
      onClick={() => inputRef.current?.focus()}
      onSubmit={(e) => {
        e.preventDefault()
        router.push('/search?query=' + inputRef.current?.value)
      }}
    >
      <Search />
      <input
        type="text"
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Szukaj wg. treści pytania"
        className="bg-transparent grow"
      />
    </form>
  )
}
