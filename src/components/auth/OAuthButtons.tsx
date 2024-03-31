"use client"

import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"
import { Button } from "../ui/Button"
import Image from "next/image"
import GoogleLogo from "../../public/google.svg"
import DiscordLogo from "../../public/discord-mark.svg"
import { toast } from "sonner"

export default function OAuthButtons() {
  const signInWithProvider = async (provider: Provider) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL as string}/auth/callback`,
      },
    })
    if (error) {
      toast.error("Wystąpił błąd w trakcie logowania")
      console.error(error)
    }
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
