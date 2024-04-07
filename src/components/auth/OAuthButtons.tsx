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

  return (
    <div className="flex flex-col gap-4">
      <Button className="gap-4" onClick={() => signInWithProvider("google")}>
        <Image src={GoogleLogo} alt="" width={24} height={24} />
        Kontynuuj przez Google
      </Button>
      <Button className="gap-4" onClick={() => signInWithProvider("discord")}>
        <Image src={DiscordLogo} alt="" width={24} height={24} />
        Kontynuuj przez Discord
      </Button>
    </div>
  )
}
