'use client'

import Link from 'next/link'
import { Button } from './Button'
import { createClient } from '@/lib/supabase/client'
import { Menu, XCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import ProfileBlock from './ProfileBlock'

interface MobileNavigationProps {
  user: User | null
}

interface UserProfile {
  avatar_url: string
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
    if (isOpen) setIsOpen(false)
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
        .from('profiles')
        .select('avatar_url, display_name, email')
        .eq('user_id', user.id)
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

  useEffect(() => {
    if (wasProfileFetched.current) return
    fetchProfile()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <>
      <button onClick={toggleOpen} className="hover:cursor-pointer">
        {isOpen ? <XCircle /> : <Menu />}
      </button>
      {isOpen ? (
        <nav className="bg-background-light z-50 fixed left-0 right-0 bottom-0 top-[67px]">
          <div className="container mx-auto flex flex-col gap-6 py-4">
            <div className="border border-background-bright bg-background-bright/30 flex flex-col justify-center gap-4 p-4">
              {profile ? (
                <ProfileBlock profile={profile} />
              ) : (
                <Button
                  variant="primary"
                  asChild
                  /* 
                    MobileNavigation is not present in the auth layout
                    so we need to set the overflow to auto manually
                  */
                  onClick={() => (document.body.style.overflow = 'auto')}
                >
                  <Link href="/login">Zaloguj</Link>
                </Button>
              )}
            </div>
            <Link href="/" className="text-xl pb-2" onClick={() => closeOnCurrent('/')}>
              Strona główna
            </Link>
            <Link
              href="/#inf02"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/#inf02')}
            >
              INF.02/EE.08
            </Link>
            <Link
              href="/#inf03"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/#inf03')}
            >
              INF.03/EE.09/E.14
            </Link>
            <Link
              href="/search"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/search')}
            >
              Wyszukiwarka pytań
            </Link>
            <Link
              href="/hardest"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/hardest')}
            >
              Najtrudniejsze pytania
            </Link>
            <Link
              href="/privacy"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/privacy')}
            >
              Polityka prywatności
            </Link>
            <Link
              href="/contact"
              className="text-xl pb-2"
              onClick={() => closeOnCurrent('/contact')}
            >
              Formularz kontaktowy
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
    </>
  )
}
