import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default async function ConfirmSignupPage() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center grow">
        <h1 className="text-4xl font-bold">Potwierdź rejestrację</h1>
        <p className="text-muted">
          Na podany adres email została wysłana wiadomość z linkiem do potwierdzenia
          swojej rejestracji. Potwierdzenie rejestracji jest wymagane aby zalogowanie się
          na nowo utworzone konto było możliwe. Pamiętaj o sprawdzeniu folderu spam, jeśli
          nie widzisz wiadomości w swojej skrzynce odbiorczej. Możesz zamknąć te kartę
          przeglądarki.
        </p>
        <Button variant="primary" asChild>
          <Link href="/">Przejdź na stronę główną</Link>
        </Button>
      </div>
    </>
  )
}
