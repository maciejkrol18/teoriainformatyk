import Dashboard from "@/components/Dashboard"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <main>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-primary flex items-center justify-center rounded-full">
          AVATAR PLACEHOLDER
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{data.user.email}</h1>
        </div>
      </div>
      <Dashboard />
    </main>
  )
}
