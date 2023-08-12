"use client"

import { useLockBodyScroll } from "@uidotdev/usehooks"
import * as Accordion from "@radix-ui/react-accordion"

interface MobileNavigationProps {}

export default function MobileNavigation({}: MobileNavigationProps) {
  useLockBodyScroll()
  return (
    <nav className="bg-black p-4 md:px-0 z-50 fixed left-0 right-0 bottom-0 top-16">
      <div className="container mx-auto flex flex-col gap-6">
        <a href="/panel" className="text-xl pb-2 border-secondary-300 border-b-2">
          Panel użytkownika
        </a>
        <Accordion.Root
          className="pb-2 border-secondary-300 border-b-2"
          type="single"
          collapsible
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>
              <span className="text-xl">Kwalifikacja INF.02</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col py-2 gap-1">
                <a href="/inf02/jedno-pytanie" className="text-lg">
                  Jedno pytanie
                </a>
                <a href="/inf02/egzamin" className="text-lg">
                  Egzamin
                </a>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <Accordion.Root
          className="pb-2 border-secondary-300 border-b-2"
          type="single"
          collapsible
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>
              <span className="text-xl">Kwalifikacja INF.03</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col py-2 gap-1">
                <a href="/inf03/jedno-pytanie" className="text-lg">
                  Jedno pytanie
                </a>
                <a href="/inf03/egzamin" className="text-lg">
                  Egzamin
                </a>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <a href="/szukaj" className="text-xl pb-2 border-secondary-300 border-b-2">
          Wyszukiwarka pytań
        </a>
        <a
          href="https://github.com/maciejkrol18/teoriainformatyk"
          target="_blank"
          className="text-xl pb-2 border-secondary-300 border-b-2"
        >
          Github
        </a>
      </div>
    </nav>
  )
}
