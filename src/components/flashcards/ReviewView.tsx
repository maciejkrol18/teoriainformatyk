import { useState } from "react"
import { Button } from "../ui/Button"
import Card from "./Card"
import ProgressResetWarning from "./ProgressResetWarning"

interface ReviewViewProps {
  handleStartFromBeginning: () => void
  handleContinue: () => void
  amountKnown: number
  totalQuestionsAmount: number
}

export default function ReviewView({
  handleStartFromBeginning,
  handleContinue,
  amountKnown,
  totalQuestionsAmount,
}: ReviewViewProps) {
  const [open, setOpen] = useState<boolean>(false)
  const isComplete = amountKnown === totalQuestionsAmount
  return (
    <>
      <Card>
        {isComplete ? (
          <>
            <p className="text-2xl font-semibold text-accent">Gratulacje!</p>
            <p className="text-lg">Przerobiono wszystkie pytania z tej kwalifikacji</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold">Znasz już {amountKnown} pytań!</p>
            <p className="text-lg">
              Pozostało Ci jeszcze {totalQuestionsAmount - amountKnown} pytań
            </p>
            <div className="flex w-full items-center gap-2 px-4">
              <div className="bg-background-bright h-4 grow rounded-md">
                <div
                  className="bg-primary w-full h-full rounded-md"
                  style={{
                    width: `${Math.floor((amountKnown / totalQuestionsAmount) * 100)}%`,
                  }}
                />
              </div>
              {amountKnown}/{totalQuestionsAmount}
            </div>
          </>
        )}
      </Card>
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="grow" onClick={() => setOpen(true)}>
          Ćwiczę od początku
        </Button>
        {!isComplete && (
          <Button className="grow" onClick={handleContinue}>
            Ćwiczę pozostałe
          </Button>
        )}
      </div>
      <ProgressResetWarning
        open={open}
        setOpen={setOpen}
        confirmFn={handleStartFromBeginning}
      />
    </>
  )
}
