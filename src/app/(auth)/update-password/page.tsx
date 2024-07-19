"use client"

import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm"
import { createClient } from "@/lib/supabase/client"
import getUser from "@/lib/supabase/get-user"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

/*
  This is the most hacky part of the app. 
  Supabase docs regarding password recovery are severely lacking
  For example, the auth listener NEVER sends a "PASSWORD_RECOVERY" event. 
  So, we have to do all of these workarounds to get the password recovery flow working.

  This component should redirect to the main page if the user was logged in prior to
  accessing this route (redirectIfLoggedIn)

  When user clicks the recovery link, they get sent to this page with pkce token stuff in the url
  When that gets resolved and removed from the url, the "INITIAL_SESSION" event is fired

  In case the "INITIAL_SESSION" event doesn't fire, the component has a 5s timeout to redirect
  to the homepage if the user wasn't found and the loading state is still true. This occurs
  when the link expired, for example
*/

export default function UpdatePasswordPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [isRequestValid, setIsRequestValid] = useState(false)
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const fetchUser = async () => {
    const { user } = await getUser()
    setUser(user)
  }

  const redirectIfLoggedIn = async () => {
    const { user } = await getUser()
    if (user) {
      redirectTimeout.current && clearTimeout(redirectTimeout.current)
      router.replace("/")
    }
  }

  const checkIfRequestValid = async () => {
    if (user && user.email) {
      const supabase = createClient()
      const { data } = await supabase.rpc("check_password_change_validity", {
        email_to_check: user.email,
      })
      setIsRequestValid(Boolean(data))
      setLoading(false)
    }
  }

  useEffect(() => {
    redirectIfLoggedIn()

    const supabase = createClient()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        console.log("INITIAL_SESSION", new Date().toLocaleTimeString())
        fetchUser()
        data.subscription.unsubscribe()
      }
    })

    redirectTimeout.current = setTimeout(() => {
      if (!user) router.replace("/")
    }, 5000)

    return () => {
      redirectTimeout.current && clearTimeout(redirectTimeout.current)
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      checkIfRequestValid()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex flex-col grow gap-4">
        <p className="text-lg text-center">Sprawdzanie uwierzytelnienia...</p>
        <p className="text-sm text-muted text-center">
          Strona przetwarza twoje dane. W przypadku bycia zalogowanym przed przejściem na
          tę stronę, nie aktywnego linku resetu hasła lub innego wewnętrzego błędu strony,
          zostaniesz przekierowany na stronę główną
        </p>
      </div>
    )
  }

  if (user && isRequestValid) {
    redirectTimeout.current && clearTimeout(redirectTimeout.current)
    return <UpdatePasswordForm />
  } else if (user && !isRequestValid) {
    redirectTimeout.current && clearTimeout(redirectTimeout.current)
    return (
      <div className="flex flex-col grow items-center justify-center gap-4">
        <p className="text-lg text-center">
          {user.email} nie posiada aktywnego tokenu odzyskiwania hasła. Należy wykonać
          nową prośbę o odzyskanie hasła
        </p>
      </div>
    )
  } else {
    redirectTimeout.current && clearTimeout(redirectTimeout.current)
    router.replace("/")
    return null
  }
}
