'use client'

import updateHardCollection from '@/lib/supabase/hard-collection'
import { Button } from './ui/Button'
import { toast } from 'sonner'
import { useState } from 'react'
import { useThrottledCallback } from 'use-debounce'

interface HardCollectionButtonProps extends React.ComponentProps<typeof Button> {
  hardCollection: number[]
  setHardCollection: React.Dispatch<React.SetStateAction<number[]>>
  targetQuestionId: number | undefined
  isAuthenticated: boolean
}

export default function HardCollectionButton({
  hardCollection,
  setHardCollection,
  targetQuestionId,
  isAuthenticated,
  ...rest
}: HardCollectionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const updateData = async () => {
    if (!isAuthenticated) {
      toast.info('Zaloguj się, aby korzystać z tej funkcji')
      return
    }

    if (hardCollection && targetQuestionId) {
      setIsLoading(true)
      const action = hardCollection.includes(targetQuestionId) ? 'remove' : 'add'

      setHardCollection((prev) => {
        return action === 'remove'
          ? prev.filter((id) => id !== targetQuestionId)
          : [targetQuestionId, ...prev]
      })

      const { success, message } = await updateHardCollection(targetQuestionId, action)
      if (success) {
        toast.success(message)
      } else {
        toast.error(message)
      }
      setIsLoading(false)
    }
  }

  const handleHardCollectionClick = useThrottledCallback(updateData, 2000)

  return <Button {...rest} onClick={handleHardCollectionClick} disabled={isLoading} />
}
