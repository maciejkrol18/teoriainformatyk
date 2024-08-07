'use client'

import Link from 'next/link'
import { Button } from './Button'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { signOut } from '@/app/(auth)/actions'

interface UserProfile {
  avatar_url: string
  display_name: string
  email: string
}

interface ProfileBlockProps {
  profile: UserProfile
}

export default function ProfileBlock({ profile }: ProfileBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <img
          src={profile.avatar_url}
          alt={profile.display_name}
          className="w-12 h-12 rounded-full bg-primary"
        />
        <div>
          <p className="font-semibold text-xl whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {profile.display_name}
          </p>
          <p className="text-muted whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {profile.email}
          </p>
        </div>
      </div>
      <Button variant="outline" className="justify-start p-0 border-none" asChild>
        <Link href="/dashboard">
          <LayoutDashboard /> Panel użytkownika
        </Link>
      </Button>
      <Button
        variant="outline"
        className="justify-start p-0 border-none"
        onClick={() => signOut()}
      >
        <LogOut /> Wyloguj
      </Button>
    </div>
  )
}
