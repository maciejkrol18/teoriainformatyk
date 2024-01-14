import { cn } from "@/lib/utils"

interface AnswerBoxProps {
  className?: string
  disabled?: boolean
  marker: string | number
  content: string
  onClick?: () => void
}

export default function AnswerBox({
  className,
  disabled,
  marker,
  content,
  onClick,
}: AnswerBoxProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn("flex gap-2 bg-secondary-300 p-2 drop-shadow-lg", className)}
    >
      <span className="uppercase font-semibold">{marker}.</span>
      <span className="text-left">{content}</span>
    </button>
  )
}
