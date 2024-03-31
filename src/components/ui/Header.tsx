"use client"

import { XCircleIcon, Menu } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import MobileNavigation from "./MobileNavigation"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"
import BrandLogo from "./BrandLogo"
import HeaderAuth from "./HeaderAuth"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { usePathname } from "next/navigation"
import { AuthContext } from "../auth/AuthContext"

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const user = useContext(AuthContext)

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
        <div className="hidden lg:flex lg:items-center gap-4">
          <ThemeSwitch />
          <p>|</p>
          <HeaderAuth user={user} />
        </div>
        <button className="lg:hidden" onClick={() => setIsMobileNavOpen((prev) => !prev)}>
          {isMobileNavOpen ? (
            <XCircleIcon className="h-full aspect-square" />
          ) : (
            <Menu className="h-full aspect-square" />
          )}
        </button>
      </div>
      {isMobileNavOpen && <MobileNavigation setIsOpen={setIsMobileNavOpen} user={user} />}
    </header>
  )
}
