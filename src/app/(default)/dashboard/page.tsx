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
    <div className="flex flex-col gap-8">
      <DashboardHeader userId={data.user.id} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <DashboardStats userId={data.user.id} className="flex-1" />
        <DashboardLatestExams userId={data.user.id} className="flex-1" />
      </div>
      <DashboardBlock
        blockTitle="Zbiór trudnych pytań"
        blockActions={
          <Button variant="primary" size="sm" asChild>
            <Link href="/search?hardOnly=true">Wyświetl swój zbiór</Link>
          </Button>
        }
      >
        <p className="text-muted">
          Zapisuj najtrudniejsze dla ciebie pytania z poziomu trybu jednego pytania oraz
          strony wyszukiwarki aby powtarzać je w specjalnym, trudnym trybie jednego
          pytania. Aby zobaczyć listę pytań najczęściej uznawanych przez wszystkich
          użytkowników serwisu za trudne, przejdź tutaj
        </p>
      </DashboardBlock>
      <DashboardAccount userId={data.user.id} />
    </div>
  )
}
