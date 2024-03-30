import BrandLogo from "@/components/ui/BrandLogo"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import GoogleLogo from "../../../public/google.svg"
import DiscordLogo from "../../../public/discord-mark.svg"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="container mx-auto py-4 flex flex-col lg:flex-row grow">
      <div className="flex flex-col gap-8 grow">
        <Link href="/" className="flex justify-center">
          <BrandLogo size="big" />
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-display font-semibold">Witamy ponownie</h1>
          <h2 className="text-lg text-muted">Zaloguj się do swojego konta</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="gap-4">
            <Image src={GoogleLogo} alt="" width={24} height={24} />
            Kontynuuj przez Google
          </Button>
          <Button className="gap-4">
            <Image src={DiscordLogo} alt="" width={24} height={24} />
            Kontynuuj przez Discord
          </Button>
        </div>
        <div className="flex items-center w-full gap-2">
          <div className="h-[1px] bg-background-bright grow" />
          <p>lub</p>
          <div className="h-[1px] bg-background-bright grow" />
        </div>
        <div className="flex flex-col gap-2">
          <LoginForm />
          <p className="text-center">
            Nie posiadasz konta?{" "}
            <Link href="/register" className="underline">
              Zarejestruj się
            </Link>
          </p>
        </div>
        <p className="text-muted text-center">
          Kontynuując zgadzasz się na warunki
          <br />
          <Link href="/privacy" className="underline">
            Polityki Prywatności
          </Link>
        </p>
      </div>
    </div>
  )
}
