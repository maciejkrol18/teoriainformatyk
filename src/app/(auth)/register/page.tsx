import RegisterForm from "@/components/auth/RegisterForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect("/dashboard")
  }

  return (
    <>
      <div className="text-center lg:text-left leading-10 lg:leading-[60px]">
        <h1 className="text-4xl lg:text-5xl font-display font-semibold">
          Stwórz nowe konto
        </h1>
        <h2 className="text-lg lg:text-xl text-muted">
          Zarejestruj się za pomocą adresu email
        </h2>
      </div>
      <RegisterForm />
    </>
  )
}
