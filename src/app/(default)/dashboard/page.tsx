import DashboardAccount from '@/components/dashboard/DashboardAccount'
import DashboardBlock from '@/components/dashboard/DashboardBlock'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardLatestExams from '@/components/dashboard/DashboardLatestExams'
import DashboardStats from '@/components/dashboard/DashboardStats'
import { Button } from '@/components/ui/Button'
import getUser from '@/lib/supabase/get-user'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader userId={user.id} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <DashboardStats userId={user.id} className="flex-1" />
        <DashboardLatestExams userId={user.id} className="flex-1" />
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
          użytkowników serwisu za trudne, przejdź{' '}
          <Link href="/hardest" className="underline text-accent">
            tutaj
          </Link>
        </p>
      </DashboardBlock>
      <DashboardAccount userId={user.id} />
    </div>
  )
}
