"use client"

import { XCircleIcon, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import MobileNavigation from "./MobileNavigation"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const path = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  useEffect(() => {
    setMobileNavOpen(false)
  }, [path])
  return (
    <header className="py-4">
      <div className="px-4 md:px-0 container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading tracking-wide">
          teoriainformatyk
        </Link>
        <nav className="hidden lg:flex gap-8">
          <Link href="/panel" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            Panel użytkownika
          </Link>
          <Link href="/szukaj" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            Wyszukiwarka pytań
          </Link>
          <a
            href="https://github.com/maciejkrol18/teoriainformatyk"
            target="_blank"
            className="py-2 px-4 rounded-md hover:bg-secondary-300"
          >
            Github
          </a>
        </nav>
        <button className="lg:hidden" onClick={() => setMobileNavOpen((prev) => !prev)}>
          {mobileNavOpen ? (
            <XCircleIcon className="h-full aspect-square" />
          ) : (
            <Menu className="h-full aspect-square" />
          )}
        </button>
      </div>
      {mobileNavOpen && <MobileNavigation />}
    </header>
  )
}
