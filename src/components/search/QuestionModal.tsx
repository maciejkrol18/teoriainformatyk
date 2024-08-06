'use client'

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/Credenza'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import QuestionDetails from '../ui/QuestionDetails'

interface QuestionModalProps extends React.ComponentProps<typeof QuestionDetails> {
  showHardCollectionButton?: boolean
}

export default function QuestionModal({
  showHardCollectionButton,
  ...rest
}: QuestionModalProps) {
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
          <CredenzaTitle>Pytanie #{rest.question.id}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="max-h-[500px] overflow-y-auto">
            <div className="pr-2">
              <QuestionDetails
                showHardCollectionButton={showHardCollectionButton}
                {...rest}
              />
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
