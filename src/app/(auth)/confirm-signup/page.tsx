import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default async function ConfirmSignupPage() {
  return (
    <>
      <div className="flex flex-col gap-4 text-center justify-center grow">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">Potwierdź rejestrację</h1>
          <p>
            Na podany adres email została wysłana wiadomość z linkiem do potwierdzenia
            swojej rejestracji. Pamiętaj o sprawdzeniu folderu spam, jeśli nie widzisz
            wiadomości w swojej skrzynce odbiorczej. Możesz zamknąć te kartę przeglądarki.
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/">Przejdź na stronę główną</Link>
        </Button>
      </div>
    </>
  )
}
