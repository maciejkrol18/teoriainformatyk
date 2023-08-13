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
    <header className={cn({ "bg-primary": path !== "/" }, "py-4")}>
      <div className="px-4 md:px-0 container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-wide">
          teoriainformatyk
        </a>
        {/* Mobile nav menu */}
        <button onClick={() => setMobileNavOpen((prev) => !prev)}>
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
