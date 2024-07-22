'use client'

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/Credenza'
import { Question } from '@/types/question'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { useRouter } from 'next/navigation'
import QuestionDetails from '../ui/QuestionDetails'

interface SearchResultModalProps {
  question: Question
  showHardCollectionButton?: boolean
}

export default function SearchResultModal({
  question,
  showHardCollectionButton,
}: SearchResultModalProps) {
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    if (!open) {
      router.back()
    }
  }, [open])

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="pb-8">
        <CredenzaHeader>
          <CredenzaTitle>Pytanie #{question.id}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="max-h-[500px] overflow-y-auto">
            <div className="pr-2">
              <QuestionDetails
                question={question}
                showHardCollectionButton={showHardCollectionButton}
              />
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
