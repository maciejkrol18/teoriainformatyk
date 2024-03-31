import BrandLogo from "@/components/ui/BrandLogo"
import Link from "next/link"
import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row grow">
      <div className="p-4 flex flex-1">
        <div className="flex flex-col grow max-w-[800px] mx-auto items-center justify-center lg:items-stretch lg:justify-between gap-8">
          <Link href="/" className="flex justify-center lg:justify-normal">
            <BrandLogo size="big" />
          </Link>
          <div className="text-center lg:text-left leading-10 lg:leading-[60px]">
            <h1 className="text-4xl lg:text-5xl font-display font-semibold">
              Stwórz nowe konto
            </h1>
            <h2 className="text-lg lg:text-xl text-muted">
              Zarejestruj się za pomocą adresu email
            </h2>
          </div>
          <RegisterForm />
          <p className="text-muted text-center">
            Kontynuując zgadzasz się na warunki
            <br />
            <Link href="/privacy" className="underline">
              Polityki Prywatności
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
    </div>
  )
}
