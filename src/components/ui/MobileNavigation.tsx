"use client"

import { useLockBodyScroll } from "@uidotdev/usehooks"
import Link from "next/link"
import { SetStateAction } from "react"

interface MobileNavigationProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function MobileNavigation({ setIsOpen }: MobileNavigationProps) {
  useLockBodyScroll()

  const onLinkClick = () => setIsOpen(false)

  return (
    <nav className="bg-background-light z-50 fixed left-0 right-0 bottom-0 top-[67px]">
      <div className="container mx-auto flex flex-col gap-6 py-4">
        <Link href="/" className="text-xl pb-2" onClick={onLinkClick}>
          Strona główna
        </Link>
        <Link href="/#inf02" className="text-xl pb-2" onClick={onLinkClick}>
          INF.02/EE.08
        </Link>
        <Link href="/#inf03" className="text-xl pb-2" onClick={onLinkClick}>
          INF.03/EE.09/E.14
        </Link>
        <Link href="/search" className="text-xl pb-2" onClick={onLinkClick}>
          Wyszukiwarka pytań
        </Link>
        <Link
          href="https://github.com/maciejkrol18/teoriainformatyk"
          target="_blank"
          className="text-xl pb-2"
        >
          Github
        </Link>
      </div>
    </nav>
  )
}
