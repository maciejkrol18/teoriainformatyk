"use client"

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/Credenza"
import { Question } from "@/types/question"
import { useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { useRouter } from "next/navigation"

export default function SearchResultModal({ question }: { question: Question }) {
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
          <p>{question.content}</p>
        </CredenzaBody>
        <CredenzaClose asChild>
          <Button>Zamknij</Button>
        </CredenzaClose>
      </CredenzaContent>
    </Credenza>
  )
}
