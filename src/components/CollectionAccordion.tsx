"use client"
import * as Accordion from "@radix-ui/react-accordion"

interface CollectionAccordionProps {
  children: React.ReactNode
}

export default function CollectionAccordion({ children }: CollectionAccordionProps) {
  return (
    <Accordion.Root className="space-y-2" type="single" collapsible>
      {children}
    </Accordion.Root>
  )
}
