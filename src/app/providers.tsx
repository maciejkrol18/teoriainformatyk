"use client"

import { ThemeProvider } from "next-themes"
import { AuthContext } from "@/components/auth/AuthContext"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { usePathname } from "next/navigation"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  console.log("Providers rendered")

  const [user, setUser] = useState<User | null>(null)

  const path = usePathname()

  const getUser = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  useEffect(() => {
    getUser()
  }, [path])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </ThemeProvider>
  )
}
