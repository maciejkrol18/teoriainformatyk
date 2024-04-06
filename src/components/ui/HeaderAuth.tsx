import Link from "next/link"
import { Button } from "./Button"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

interface HeaderAuthProps {
  user: User | null
}

export default async function HeaderAuth({ user }: HeaderAuthProps) {
  console.log(`\n\n Rendering HeaderAuth. User value: ${JSON.stringify(user)} \n\n`)
  if (user) {
    console.log("\n User was truthy \n")
    const supabase = createClient()

    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("user_id", user.id)
      .single()

    if (!data || error) {
      console.log(`
        \n\n
        Failed to fetch the profile. Rendering the 'Login' Button\n
        Returned data: ${JSON.stringify(data)}\n
        Returned error: ${JSON.stringify(error)}
        \n\n
      `)
      return (
        <Button variant="primary" size="sm" asChild>
          <Link href="/login">Zaloguj</Link>
        </Button>
      )
    } else {
      console.log("\n Profile successfully fetched. Rendering avatar image \n")
      return (
        <Link href="/dashboard">
          <img
            src={data.avatar_url ? data.avatar_url : ""}
            alt="Profil"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
      )
    }
  } else {
    console.log("\n User was falsy. Rendering 'Login' button \n")
    return (
      <Button variant="primary" asChild>
        <Link href="/login">Zaloguj</Link>
      </Button>
    )
  }
}
