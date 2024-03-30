"use client"

import { XCircleIcon, Menu } from "lucide-react"
import { useState } from "react"
import MobileNavigation from "./MobileNavigation"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import BrandLogo from "./BrandLogo"

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-calsans tracking-wide">
          <BrandLogo size="small" />
        </Link>
        <nav className="hidden lg:flex gap-8">
          <Link href="/#inf03" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            INF.03/EE.09/EE.14
          </Link>
          <Link href="/#inf02" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            INF.02/EE.08
          </Link>
          <Link href="/search" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            Wyszukiwarka
          </Link>
        </nav>
        <div className="hidden lg:flex gap-4">
          <ThemeSwitch />
          <p>|</p>
          <p>Zaloguj</p>
        </div>
        <button className="lg:hidden" onClick={() => setIsMobileNavOpen((prev) => !prev)}>
          {isMobileNavOpen ? (
            <XCircleIcon className="h-full aspect-square" />
          ) : (
            <Menu className="h-full aspect-square" />
          )}
        </button>
      </div>
      {isMobileNavOpen && <MobileNavigation setIsOpen={setIsMobileNavOpen} />}
    </header>
  )
}
