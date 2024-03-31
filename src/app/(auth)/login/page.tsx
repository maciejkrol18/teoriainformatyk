import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"
import OAuthButtons from "@/components/auth/OAuthButtons"

export default function LoginPage() {
  return (
    <>
      <div className="text-center lg:text-left leading-10 lg:leading-[60px]">
        <h1 className="text-4xl lg:text-5xl font-display font-semibold">
          Witamy ponownie
        </h1>
        <h2 className="text-lg lg:text-xl text-muted">Zaloguj się do swojego konta</h2>
      </div>
      <OAuthButtons />
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
    </>
  )
}
