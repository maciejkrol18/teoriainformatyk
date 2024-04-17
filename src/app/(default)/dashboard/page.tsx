import DashboardAccount from "@/components/dashboard/DashboardAccount"
import DashboardBlock from "@/components/dashboard/DashboardBlock"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardLatestExams from "@/components/dashboard/DashboardLatestExams"
import DashboardStats from "@/components/dashboard/DashboardStats"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <DashboardHeader userId={data.user.id} />
      <div className="flex flex-col gap-4 lg:flex-row">
        <DashboardStats userId={data.user.id} className="flex-1" />
        <DashboardLatestExams userId={data.user.id} className="flex-1" />
      </div>
      <DashboardBlock
        blockTitle="Kolekcje pytań"
        blockActions={
          <Button variant="primary" size="sm" asChild>
            <Link href="/dashboard/collections">Przejdź do menedżera kolekcji</Link>
          </Button>
        }
      >
        <p className="text-muted">
          Kolekcje pozwalają na personalizacje trybu jednego pytania. Pytania w trudnej
          kolekcji pozwalają na włączenie trybu trudnego, w którym pojawiają się tylko i
          wyłącznie pytania z tej kolekcji. Natomiast pytania w łatwej kolekcji zupełnie
          nie pojawiają się w trybie jednego pytania
        </p>
      </DashboardBlock>
      <DashboardAccount userId={data.user.id} />
    </div>
  )
}
