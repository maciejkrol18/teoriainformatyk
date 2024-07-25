import { createClient } from '@/lib/supabase/server'

interface DashboardHeaderProps {
  userId: string
}

export default async function DashboardHeader({ userId }: DashboardHeaderProps) {
  const supabase = createClient()

  const { data } = await supabase
    .from('profiles')
    .select('avatar_url, created_at, display_name')
    .eq('user_id', userId)
    .single()

  const dateJoined =
    data && data.created_at
      ? new Date(data.created_at).toLocaleDateString()
      : 'Nieznana data dołączenia'

  return (
    <div className="flex flex-col lg:flex-row text-center lg:text-left gap-6 items-center">
      <img src={data?.avatar_url} alt="Zdjęcie profilowe" className="rounded-full" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">
          {data && data.display_name ? data.display_name : 'Użytkownik'}
        </h1>
        <p className="text-lg text-muted">Użytkownik od {dateJoined}</p>
      </div>
    </div>
  )
}
