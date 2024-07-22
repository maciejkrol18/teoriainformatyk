import ResetStatsForm from '@/components/dashboard/ResetStatsForm'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { ArrowUpLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ResetStatsPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-8">
      <Button asChild variant="outline" className="max-w-fit">
        <Link href="/dashboard">
          <ArrowUpLeft /> Wróć na stronę główną panelu
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="text-4xl font-display">Zresetuj statystyki</h1>
        <p>
          <strong className="text-red-500">
            <span className="uppercase">Uwaga!</span> Ta akcja jest nieodwracalna
          </strong>
        </p>
        <p>
          Reset statystyk usunie wszystkie twoje statystyki związane z trybem jednego
          pytania, usunie progres w fiszkach oraz usunie całą historię egzaminów
        </p>
      </div>
      <ResetStatsForm />
      <p className="text-muted">
        Po pomyślnym resecie statystyk nastąpi przekierowanie na stronę główną panelu
      </p>
    </div>
  )
}
