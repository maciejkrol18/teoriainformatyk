'use client'

import { cn } from '@/lib/utils'
import { BarChart, Dices, HelpCircle, Skull } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Question } from '@/types/question'
import type { SetStateAction } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import HardCollectionButton from '@/components/HardCollectionButton'

interface OneQuestionBarProps {
  openStatsFn: () => void
  rollQuestionFn: () => void
  hardModeFn: React.Dispatch<SetStateAction<boolean>>
  hardMode: boolean
  hardCollection: number[]
  setHardCollection: React.Dispatch<SetStateAction<number[]>>
  currentQuestion: Question | null
  userId: string | null
}

export default function OneQuestionBar({
  openStatsFn,
  rollQuestionFn,
  hardModeFn,
  hardMode,
  hardCollection,
  setHardCollection,
  currentQuestion,
  userId,
}: OneQuestionBarProps) {
  const toggleHardMode = () => {
    if (!userId) {
      toast.info('Zaloguj się, aby korzystać z tej funkcji')
      return
    }
    hardMode ? toast.info('Wyłączono tryb trudny') : toast.info('Tryb trudny włączony')
    hardModeFn((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'flex justify-between items-center fixed bottom-0 left-0 w-full z-40 bg-background-bright px-2 py-3 backdrop-blur-xl',
        'lg:gap-4 lg:justify-center lg:static lg:w-auto lg:z-auto lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0',
      )}
    >
      <Button
        variant="bottomBar"
        onClick={toggleHardMode}
        title={hardMode ? 'Wyłącz tryb trudny' : 'Włącz tryb trudny'}
      >
        <span className={`${hardMode ? 'text-incorrect' : 'text-correct'}`}>
          {hardMode ? 'H' : 'N'}
        </span>
      </Button>
      <HardCollectionButton
        hardCollection={hardCollection}
        setHardCollection={setHardCollection}
        targetQuestionId={currentQuestion?.id}
        isAuthenticated={userId !== null}
        variant={'bottomBar'}
        title="Dodaj/usuń z zbioru trudnych pytań"
      >
        {hardCollection &&
        currentQuestion &&
        hardCollection.includes(currentQuestion.id) ? (
          <Skull className="text-incorrect" />
        ) : (
          <Skull />
        )}
      </HardCollectionButton>
      <Link href={`/question/${currentQuestion?.id}?hideHardCollection=true`}>
        <Button variant="bottomBar" title="Wyświetl szczegóły pytania">
          <HelpCircle />
        </Button>
      </Link>
      <Button variant="bottomBar" onClick={openStatsFn} title="Statystyki sesji">
        <BarChart />
      </Button>
      <Button
        variant="bottomBar"
        onClick={rollQuestionFn}
        className="block lg:hidden"
        title="Wylosuj pytanie"
      >
        <Dices />
      </Button>
    </div>
  )
}
