"use client"

import { useLockBodyScroll } from "@uidotdev/usehooks"
import Link from "next/link"
import { Button } from "./Button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { LayoutDashboard, LogOut, Menu } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"

interface MobileNavigationProps {
  user: User | null
}

interface UserProfile {
  avatar_url: string | null
  display_name: string
  email: string
}

export default function MobileNavigation({ user }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const wasProfileFetched = useRef<boolean>(false)

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  const fetchProfile = async () => {
    if (user) {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, display_name, email")
        .eq("user_id", user.id)
        .single()

      if (!data || error) {
        return null
      }

      setProfile(data)
      wasProfileFetched.current = true
    } else {
      return null
    }
  }

  const signOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      return
    }
    window.location.reload()
  }

  useEffect(() => {
    if (wasProfileFetched.current) return
    fetchProfile()
  }, [])

  return (
    <div className="lg:hidden">
      <Menu onClick={toggleOpen} className="h-full aspect-square hover:cursor-pointer" />
      {isOpen ? (
        <nav className="bg-background-light z-50 fixed left-0 right-0 bottom-0 top-[67px]">
          <div className="container mx-auto flex flex-col gap-6 py-4">
            <div className="bg-background-bright flex flex-col gap-4 p-4">
              {profile ? (
                <>
                  <div className="flex gap-4">
                    <img
                      className="w-8 h-8 bg-primary rounded-full"
                      src={profile.avatar_url ? profile.avatar_url : ""}
                    />
                    <p className="text-xl font-semibold">{profile.display_name}</p>
                    <p className="text-lg text-muted">{profile.email}</p>
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
            <Link href="/" className="text-xl pb-2" onClick={() => closeOnCurrent("/")}>
              Strona główna
            </Link>
            <Link
              href="/#inf02"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent("/#inf02")}
            >
              INF.02/EE.08
            </Link>
            <Link
              href="/#inf03"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent("/#inf03")}
            >
              INF.03/EE.09/E.14
            </Link>
            <Link
              href="/search"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent("/search")}
            >
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
      ) : null}
    </div>
  )
}
