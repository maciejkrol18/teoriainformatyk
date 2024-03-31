"use client"

import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./Button"

interface HeaderAuthProps {
  user: User | null
}

export default function HeaderAuth({ user }: HeaderAuthProps) {
  if (user) {
    return (
      <Button variant="primary" size="sm" asChild>
        <Link href="/dashboard">Profil</Link>
      </Button>
    )
  } else {
    return (
      <Button variant="primary" size="sm" asChild>
        <Link href="/login">Zaloguj</Link>
      </Button>
    )
  }
}
