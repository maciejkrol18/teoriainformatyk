"use client"

import { ThemeProvider } from "next-themes"
import { AuthContext } from "@/components/auth/AuthContext"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
