import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { forwardRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium",
  {
    variants: {
      variant: {
        default: "bg-background-light hover:bg-background-light/90",
        primary: "bg-primary hover:bg-primary/90",
        secondary: "bg-secondary hover:bg-secondary/90",
        outline: "border border-bg-background-light hover:bg-background-bright",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
