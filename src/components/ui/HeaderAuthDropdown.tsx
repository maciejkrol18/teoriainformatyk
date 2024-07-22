"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu"
import Link from "next/link"
import { LayoutDashboard, LogOut } from "lucide-react"
import { signOut } from "@/app/(auth)/actions"

interface HeaderAuthDropdownProps {
  email: string
  display_name: string
  avatar_url: string | null
}

export default function HeaderAuthDropdown({
  email,
  display_name,
  avatar_url,
}: HeaderAuthDropdownProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <img
            src={avatar_url ? avatar_url : ""}
            alt="Profil"
            width={32}
            height={32}
            className="rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {display_name}
          <br />
          <span className="text-muted">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/dashboard"
            className="flex gap-2 w-full"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard /> Panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex gap-2 w-full"
            onClick={() => {
              setOpen(false)
              signOut()
            }}
          >
            <LogOut /> Wyloguj
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
