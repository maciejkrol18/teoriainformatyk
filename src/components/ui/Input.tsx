import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background-light flex h-10 w-full rounded-lg border border-background-bright focus:ring-1 ring-primary",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

export { Input }
