"use client"

import { useLockBodyScroll } from "@uidotdev/usehooks"
import Link from "next/link"

interface MobileNavigationProps {}

export default function MobileNavigation({}: MobileNavigationProps) {
  useLockBodyScroll()
  return (
    <nav className="bg-primary shadow-card-inset p-4 md:px-0 z-50 fixed left-0 right-0 bottom-0 top-16">
      <div className="container mx-auto flex flex-col gap-6">
        <Link href="/" className="text-xl pb-2 border-secondary-300 border-b-2">
          Strona główna
        </Link>
        <Link href="/dashboard" className="text-xl pb-2 border-secondary-300 border-b-2">
          Panel użytkownika
        </Link>
        <Link href="/search" className="text-xl pb-2 border-secondary-300 border-b-2">
          Wyszukiwarka pytań
        </Link>
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
