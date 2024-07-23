import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-lg font-medium',
  {
    variants: {
      variant: {
        default:
          'border border-background-bright bg-gradient-to-b from-background-bright/90 to-background-bright/50 hover:to-background-bright/70',
        primary:
          'border border-primary bg-gradient-to-b from-primary/90 to-primary/50 hover:to-primary/70',
        secondary:
          'border border-secondary bg-gradient-to-b from-secondary/90 to-secondary/50',
        outline:
          'border border-background-bright hover:bg-gradient-to-b hover:from-background-bright/90 hover:to-background-bright/50',
        link: 'underline-offset-4 hover:underline',
        bottomBar:
          'rounded-full bg-transparent lg:bg-background-bright lg:hover:bg-background-bright/90 lg:w-14 lg:h-14',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
