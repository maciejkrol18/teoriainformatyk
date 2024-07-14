"use client"

import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"
import { Button } from "../ui/Button"
import Image from "next/image"
import GoogleLogo from "../../public/google.svg"
import DiscordLogo from "../../public/discord-mark.svg"

export default function OAuthButtons() {
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/"
    url = url.includes("http") ? url : `https://${url}`
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
    return url
  }

  const signInWithProvider = async (provider: Provider) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${getURL()}/auth/callback`,
      },
    })
  }

  console.log("[OAuth Buttons] Redirect URL -", `${getURL()}/auth/callback`)

  return (
    <div className="flex justify-center gap-4">
      <Button
        className="w-16 h-16 rounded-full"
        onClick={() => signInWithProvider("google")}
        aria-label="Zaloguj się przez Google"
      >
        <Image src={GoogleLogo} alt="Google" width={32} height={32} />
      </Button>
      <Button
        className="w-16 h-16 rounded-full"
        onClick={() => signInWithProvider("discord")}
        aria-label="Zaloguj się przez Discord"
      >
        <Image src={DiscordLogo} alt="Discord" width={32} height={32} />
      </Button>
    </div>
  )
}
