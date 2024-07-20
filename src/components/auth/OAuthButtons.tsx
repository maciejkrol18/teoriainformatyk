"use client"

import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"
import { Button } from "../ui/Button"
import Image from "next/image"
import GoogleLogo from "../../public/google.svg"
import DiscordLogo from "../../public/discord-mark.svg"
import { getURL } from "@/lib/utils"

export default function OAuthButtons() {
  const signInWithProvider = async (provider: Provider) => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    })
  }

  console.log("[OAuthButtons]", `${getURL()}auth/callback`)

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
