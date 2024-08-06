'use client'

import { cn } from '@/lib/utils'
import { BarChart, Dices, HelpCircle, Skull } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Question } from '@/types/question'
import { SetStateAction } from 'react'
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
      toast.error('Zaloguj się, aby korzystać z tej funkcji')
      return
    }
    hardMode ? toast.info('Wyłączono tryb trudny') : toast.info('Tryb trudny włączony')
    hardModeFn((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'flex justify-between items-center fixed bottom-0 left-0 w-full z-40 bg-[#0b0a0aed] px-2 py-3 backdrop-blur-xl',
        'lg:gap-4 lg:justify-center lg:static lg:w-auto lg:z-auto lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0',
      )}
    >
      <Button variant="bottomBar" onClick={toggleHardMode}>
        <span className={`${hardMode ? 'text-red-500' : 'text-green-500'}`}>
          {hardMode ? 'H' : 'N'}
        </span>
      </Button>
      <HardCollectionButton
        hardCollection={hardCollection}
        setHardCollection={setHardCollection}
        targetQuestionId={currentQuestion?.id}
        isAuthenticated={userId !== null}
        variant={'bottomBar'}
      >
        {hardCollection &&
        currentQuestion &&
        hardCollection.includes(currentQuestion.id) ? (
          <Skull className="text-red-500" />
        ) : (
          <Skull />
        )}
      </HardCollectionButton>
      <Link href={`/question/${currentQuestion?.id}?hideHardCollection=true`}>
        <Button variant="bottomBar">
          <HelpCircle />
        </Button>
      </Link>
      <Button variant="bottomBar" onClick={openStatsFn}>
        <BarChart />
      </Button>
      <Button variant="bottomBar" onClick={rollQuestionFn} className="block lg:hidden">
        <Dices />
      </Button>
    </div>
  )
}
