"use client"

import { cn } from "@/lib/utils"
import { XCircleIcon, Menu } from "lucide-react"
import { useState } from "react"
import MobileNavigation from "./MobileNavigation"
import { usePathname } from "next/navigation"

export default function Header() {
  const path = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <header className={cn({ "bg-primary shadow-card-inset": path !== "/" }, "py-4")}>
      <div className="px-4 md:px-0 container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-wide">
          teoriainformatyk
        </a>
        <nav className="hidden lg:flex gap-8">
          <a href="/" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            Panel użytkownika
          </a>
          <a href="/szukaj" className="py-2 px-4 rounded-md hover:bg-secondary-300">
            Wyszukiwarka pytań
          </a>
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
