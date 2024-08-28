import { createClient } from '@/lib/supabase/server'
import DashboardBlock from './DashboardBlock'
import Link from 'next/link'
import { KeyRound, LifeBuoy, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'

interface DashboardAccountProps {
  userId: string
}

const DataParagraph = ({ label, value }: { label: string; value: string }) => {
  return (
    <p>
      <span className="text-lg font-medium">{label}</span>{' '}
      <span className="text-muted">{value}</span>
    </p>
  )
}

export default async function DashboardAccount({ userId }: DashboardAccountProps) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  const dateJoined = data?.created_at
    ? new Date(data.created_at).toLocaleDateString()
    : 'Nieznana data dołączenia'

  if (!error) {
    return (
      <DashboardBlock blockTitle="Twoje konto">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/change-password">
              <KeyRound /> Zmień hasło
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/reset-stats">
              <RotateCcw /> Zresetuj statystyki
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/delete-account">
              <Trash2 /> Usuń konto
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact?type=help">
              <LifeBuoy /> Pomoc
            </Link>
          </Button>
        </div>
        <DataParagraph label="Wyświetlana nazwa" value={data.display_name} />
        <DataParagraph label="Adres email" value={data.email} />
        <DataParagraph label="Data dołączenia" value={dateJoined} />
        <DataParagraph label="Identyfikator" value={data.user_id} />
      </DashboardBlock>
    )
  }
  return (
    <p className="text-muted">
      Wystąpił błąd w trakcie pobierania danych <br /> {error.message}
    </p>
  )
}
