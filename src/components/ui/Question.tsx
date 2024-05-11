"use client"

import { forwardRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const questionAnswerVariants = cva("py-2 px-4 rounded-md text-lg text-left", {
  variants: {
    variant: {
      default: "bg-background-bright",
      selected: "bg-primary",
      correct: "bg-green-800",
      incorrect: "bg-red-800",
      unanswered: "bg-blue-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface QuestionAnswerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof questionAnswerVariants> {}

interface QuestionImageProps {
  src: string
  alt: string
  loading: "eager" | "lazy"
}

const QuestionMarker = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center bg-background-bright text-lg font-bold rounded-full p-4 max-w-fit mx-auto aspect-square",
          className,
        )}
        {...props}
        ref={ref}
      />
    )
  },
)
QuestionMarker.displayName = "QuestionMarker"

const QuestionContent = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p className={cn("text-center text-xl leading-8", className)} {...props} ref={ref} />
  )
})
QuestionContent.displayName = "QuestionContent"

const QuestionAnswersContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn("flex flex-col gap-4", className)} {...props} ref={ref} />
})
QuestionAnswersContainer.displayName = "QuestionAnswersContainer"

const QuestionAnswer = forwardRef<HTMLButtonElement, QuestionAnswerProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(questionAnswerVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
QuestionAnswer.displayName = "QuestionAnswer"

const QuestionImage = ({ alt, src, loading }: QuestionImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div
      className={cn(
        "w-full h-[200px] relative bg-secondary-500",
        !imageLoaded && "bg-gradient-loading animate-loading bg-size-loading",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        className="object-contain"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}

const Question = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-col gap-8 bg-background-light p-4 rounded-lg",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Question.displayName = "Question"

export {
  Question,
  QuestionMarker,
  QuestionContent,
  QuestionAnswersContainer,
  QuestionAnswer,
  QuestionImage,
  questionAnswerVariants,
}