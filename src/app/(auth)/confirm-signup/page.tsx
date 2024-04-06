import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ConfirmSignupPage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect("/dashboard")
  }

  return (
    <>
      <div className="flex flex-col gap-4 text-center lg:text-left leading-10 lg:leading-[60px]">
        <h1 className="text-4xl lg:text-5xl font-display font-semibold">
          Potwierdź rejestrację
        </h1>
        <h2 className="text-lg lg:text-xl text-muted">
          Na podany adres email została wysłana wiadomość z linkiem do potwierdzenia
          swojej rejestracji. Pamiętaj o sprawdzeniu folderu spam, jeśli nie widzisz
          wiadomości w swojej skrzynce odbiorczej. Możesz zamknąć te kartę przeglądarki.
        </h2>
        <Button variant="primary" asChild>
          <Link href="/">Przejdź na stronę główną</Link>
        </Button>
      </div>
    </>
  )
}
