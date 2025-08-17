import Link from 'next/link'

interface SearchResultProps {
  question: {
    id: number
    content: string
  }
}

export default function SearchResult({ question }: SearchResultProps) {
  return (
    <Link
      href={`/question/${question.id}`}
      scroll={false}
      className="flex justify-between gap-4 items-center bg-background-light p-4 rounded-md hover:ring-2 hover:ring-background-bright transition-shadow"
    >
      <div className="flex flex-col gap-2">
        <p className="text-muted">ID #{question.id}</p>
        <p className="text-lg font-semibold">{question.content}</p>
      </div>
    </Link>
  )
}
