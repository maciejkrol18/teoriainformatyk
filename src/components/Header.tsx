"use client"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent }: HeaderProps) {
  return (
    <header className={cn({ "bg-primary": transparent }, "py-4 sticky")}>
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold tracking-wide">teoriainformatyk</span>
        {/* Mobile nav menu placeholder */}
        <Menu className="h-full aspect-square lg:hidden" />
      </div>
    </header>
  )
}
