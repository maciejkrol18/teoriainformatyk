'use client'

import {
  Credenza,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaContent,
} from '@/components/ui/Credenza'
import ContactForm from './ContactForm'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ContactModalProps {
  email?: string
  contactType?: string
  content?: string
}

export default function ContactModal({ email, contactType, content }: ContactModalProps) {
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
          <CredenzaTitle>Skontaktuj się z nami</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="max-h-[500px] overflow-y-auto px-2">
            <ContactForm contactType={contactType} content={content} email={email} />
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
