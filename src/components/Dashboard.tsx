"use client"

import { createClient } from "@/lib/supabase/client"

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  const logOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      return
    }
    window.location.reload()
  }
  return (
    <div className="flex flex-col gap-4">
      <p>Dashboard</p>
      <button onClick={() => logOut()}>Wyloguj</button>
    </div>
  )
}
