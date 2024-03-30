import BrandLogo from "@/components/ui/BrandLogo"
import Link from "next/link"
import RegisterForm from "@/components/RegisterForm"

export default function LoginPage() {
  return (
    <div className="container mx-auto py-4 flex flex-col lg:flex-row grow">
      <div className="flex flex-col items-center gap-12 grow">
        <Link href="/">
          <BrandLogo size="big" />
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-display font-semibold">Stwórz nowe konto</h1>
          <h2 className="text-lg text-muted">
            Zarejestruj się za pomocą adresu email i hasła
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
