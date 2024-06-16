import { Question } from "@/types/question"
import { ScanEye } from "lucide-react"

interface SearchResultProps {
  question: Question
}

export default function SearchResult({ question }: SearchResultProps) {
  return (
    <div className="flex justify-between gap-4 items-center bg-background-light p-4 rounded-md">
      <div className="flex flex-col gap-2">
        <p className="text-muted">ID #{question.id}</p>
        <p className="text-lg font-semibold max-w-[500px]">{question.content}</p>
      </div>
      <ScanEye width={48} height={48} />
    </div>
  )
}
