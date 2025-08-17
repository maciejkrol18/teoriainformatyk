"use client";

import type { Provider } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import Image from "next/image";
import GoogleLogo from "../../../public/google.svg";
import DiscordLogo from "../../../public/discord-mark.svg";
import { socialSignIn } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default function OAuthButtons() {
  const signInWithProvider = async (provider: Provider) => {
    const origin = window ? window.location.origin : "localhost:3000";
    const error = await socialSignIn(provider, origin);
    if (error) {
      toast.error(error.error);
    }
  };

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
  );
}
