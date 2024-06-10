"use client"

import { cn } from "@/lib/utils"
import { BarChart, Dices, HelpCircle, Skull } from "lucide-react"
import { Button } from "../ui/Button"
import { Question } from "@/types/question"
import { SetStateAction } from "react"
import { toast } from "sonner"

interface OneQuestionBarProps {
  openStatsFn: () => void
  rollQuestionFn: () => void
  hardModeFn: React.Dispatch<SetStateAction<boolean>>
  hardMode: boolean
  hardCollection: number[]
  currentQuestion: Question | null
  userId: string | null
}

export default function OneQuestionBar({
  openStatsFn,
  rollQuestionFn,
  hardModeFn,
  hardMode,
  hardCollection,
  currentQuestion,
  userId,
}: OneQuestionBarProps) {
  const toggleHardMode = () => {
    if (!userId) {
      toast.error("Zaloguj się, aby korzystać z tej funkcji")
      return
    }
    hardMode ? toast.info("Wyłączono tryb trudny") : toast.info("Tryb trudny włączony")
    hardModeFn((prev) => !prev)
  }

  return (
    <div
      className={cn(
        "flex justify-between items-center fixed bottom-0 left-0 w-full z-40 bg-[#0b0a0aed] px-2 py-3 backdrop-blur-xl",
        "lg:gap-4 lg:justify-center lg:static lg:w-auto lg:z-auto lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0",
      )}
    >
      <Button variant="bottomBar" onClick={() => toggleHardMode()}>
        <span className={`${hardMode ? "text-red-500" : "text-green-500"}`}>
          {hardMode ? "H" : "N"}
        </span>
      </Button>
      <Button
        variant="bottomBar"
        onClick={() => alert("TODO: Add to hard collection button")}
      >
        {hardCollection &&
        currentQuestion &&
        hardCollection.includes(currentQuestion.id) ? (
          <Skull className="text-red-500" />
        ) : (
          <Skull />
        )}
      </Button>
      <Button
        variant="bottomBar"
        onClick={() => alert("TODO: Question explanations button")}
      >
        <HelpCircle />
      </Button>
      <Button variant="bottomBar" onClick={openStatsFn}>
        <BarChart />
      </Button>
      <Button variant="bottomBar" onClick={rollQuestionFn} className="block lg:hidden">
        <Dices />
      </Button>
    </div>
  )
}
