import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col min-h-[512px] gap-4 p-4 items-center justify-center bg-background-light rounded-md text-center",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
