import BrandLogo from "@/components/ui/BrandLogo"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import Link from "next/link"
import GoogleLogo from "../../../public/google.svg"
import DiscordLogo from "../../../public/discord-mark.svg"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row grow">
      <div className="p-4 flex flex-1">
        <div className="flex flex-col grow max-w-[800px] mx-auto items-center justify-center lg:items-stretch lg:justify-between gap-8">
          <Link href="/" className="flex justify-center lg:justify-normal">
            <BrandLogo size="big" />
          </Link>
          <div className="text-center lg:text-left leading-10 lg:leading-[60px]">
            <h1 className="text-4xl lg:text-5xl font-display font-semibold">
              Witamy ponownie
            </h1>
            <h2 className="text-lg lg:text-xl text-muted">
              Zaloguj się do swojego konta
            </h2>
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
      <div className="hidden lg:block flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
    </div>
  )
}
