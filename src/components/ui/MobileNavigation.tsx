"use client"

import { useLockBodyScroll } from "@uidotdev/usehooks"
import Link from "next/link"
import { SetStateAction } from "react"
import { User } from "@supabase/supabase-js"
import { Button } from "./Button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { LayoutDashboard, LogOut } from "lucide-react"

interface MobileNavigationProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  user: User | null
}

export default function MobileNavigation({ setIsOpen, user }: MobileNavigationProps) {
  useLockBodyScroll()

  const onLinkClick = () => setIsOpen(false)

  const signOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Wystąpił błąd w trakcie wylogowywania się")
    }
    window.location.reload()
  }

  return (
    <nav className="bg-background-light z-50 fixed left-0 right-0 bottom-0 top-[67px]">
      <div className="container mx-auto flex flex-col gap-6 py-4">
        <div className="bg-background-bright flex flex-col gap-4 p-4">
          {user ? (
            <>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full" />
                <p className="text-xl font-semibold">{user.email}</p>
              </div>
              <Button variant="outline" onClick={() => signOut()}>
                <LogOut /> Wyloguj
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard /> Panel użytkownika
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="primary" asChild>
              <Link href="/login">Zaloguj</Link>
            </Button>
          )}
        </div>
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
