import { cn } from "@/lib/utils"
import { BarChart, Dices, HelpCircle, Skull, Smile } from "lucide-react"
import { Button } from "../ui/Button"

interface OneQuestionBarProps {
  openStatsFn: () => void
  rollQuestionFn: () => void
}

export default function OneQuestionBar({
  openStatsFn,
  rollQuestionFn,
}: OneQuestionBarProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center fixed bottom-0 left-0 w-full z-40 bg-[#0b0a0aed] px-2 py-3 backdrop-blur-xl",
        "lg:gap-4 lg:justify-center lg:static lg:w-auto lg:z-auto lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0",
      )}
    >
      <Button
        variant="bottomBar"
        onClick={() => alert("TODO: Normal/hard mode toggle switch")}
      >
        <div className="w-4 h-4 bg-primary rounded-full"></div>
      </Button>
      <Button
        variant="bottomBar"
        onClick={() => alert("TODO: Add to easy collection button")}
      >
        <Smile />
      </Button>
      <Button
        variant="bottomBar"
        onClick={() => alert("TODO: Add to hard collection button")}
      >
        <Skull />
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
