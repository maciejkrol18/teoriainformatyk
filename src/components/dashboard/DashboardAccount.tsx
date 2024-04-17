import { createClient } from "@/lib/supabase/server"

interface DashboardAccountProps {
  userId: string
}

const Divider = () => <div className="h-[2px] bg-background-bright" />

export default async function DashboardAccount({ userId }: DashboardAccountProps) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single()

  const dateJoined =
    data && data.created_at
      ? new Date(data.created_at).toLocaleDateString()
      : "Nieznana data dołączenia"

  return (
    <div id="account" className="flex flex-col gap-4 p-4 rounded-lg bg-background-light">
      <h2 className="text-2xl font-bold">Twoje konto</h2>
      <Divider />
      {data ? (
        <>
          <p>
            <span className="text-lg font-medium">Wyświetlana nazwa </span>
            <span className="text-muted">{data.display_name}</span>
          </p>
          <p>
            <span className="text-lg font-medium">Adres email </span>
            <span className="text-muted">{data.email}</span>
          </p>
          <p>
            <span className="text-lg font-medium">Data stworzenia konta </span>
            <span className="text-muted">{dateJoined}</span>
          </p>
          <p>
            <span className="text-lg font-medium">Metody uwierzytelnienia </span>
            <span className="text-muted">
              {data.providers.map((provider, idx) =>
                idx + 1 === data.providers.length ? provider : `${provider}, `,
              )}
            </span>
          </p>
          <p>
            <span className="text-lg font-medium">Identyfikator </span>
            <span className="text-muted">{data.user_id}</span>
          </p>
        </>
      ) : (
        <p>Nie udało się załadować twoich danych</p>
      )}
    </div>
  )
}
