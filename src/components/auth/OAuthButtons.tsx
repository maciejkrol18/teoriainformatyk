"use client"

import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"
import { Button } from "../ui/Button"
import Image from "next/image"
import GoogleLogo from "../../public/google.svg"
import DiscordLogo from "../../public/discord-mark.svg"
import { getURL } from "@/lib/utils"
import { socialSignIn } from "@/actions"
import { toast } from "sonner"

export default function OAuthButtons() {
  console.log("[OAuthButtons]", `${getURL()}auth/callback`)

  const signInWithProvider = async (provider: Provider) => {
    const error = await socialSignIn(provider)
    if (error) {
      toast.error(error.error)
    }
  }

  function urlTest() {
    console.log("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL)
    console.log("VERCEL_URL", process.env.VERCEL_URL)
    console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL)
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/"
    // Make sure to include `https://` when not localhost.
    url = url.startsWith("http") ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith("/") ? url : `${url}/`
    console.log("PROCESSED URL", url)
    return url
  }

  urlTest()

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
