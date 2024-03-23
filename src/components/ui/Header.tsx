"use client"

import { XCircleIcon, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import MobileNavigation from "./MobileNavigation"
import { usePathname } from "next/navigation"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import BrandLogo from "./BrandLogo"

export default function Header() {
  const path = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [path])

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
        <div className="flex gap-4">
          <ThemeSwitch />
          <p>|</p>
          <p>Zaloguj</p>
        </div>
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
