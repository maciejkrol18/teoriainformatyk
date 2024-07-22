import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm"
import { createClient } from "@/lib/supabase/server"
import getUser from "@/lib/supabase/get-user"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

/*
  This is the most hacky part of the app. 
  Supabase docs regarding password recovery are kind of lacking.
  For example, the auth listener NEVER sends a "PASSWORD_RECOVERY" event. 
  
  When the user clicks the recovery link, they get sent to the confirmation route with pkce
  token stuff. After that get successfully validated, the user gets authenticated, the session
  cookie is set and the user is redirected to this page.

  The page performs a check whether the user has a valid password recovery request by comparing
  the 'recovery_sent_at' field in the auth.users table with the current time as of
  calling the rpc function and since current time gets checked within the postgres function itself
  it seems safe as if there's no way to spoof the current time.
*/

export default async function UpdatePasswordPage() {
  const supabase = createClient()

  const { user } = await getUser()

  if (!user?.email) redirect("/")

  const { data } = await supabase.rpc("check_password_change_validity", {
    email_to_check: user.email,
  })

  if (user && data) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Zaktualizuj hasło</h1>
        <p className="text-muted">
          Aktualizujesz hasło dla konta z adresem email &quot;{user.email}&quot;
        </p>
        <UpdatePasswordForm />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Wystąpił błąd</h1>
          <p className="text-muted">
            Twoje konto nie posiada aktywnego żądania resetu hasła
          </p>
        </div>
        <Button variant="primary">
          <Link href="/password-recovery">Resetuj hasło</Link>
        </Button>
        <Button>
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    )
  }
}
