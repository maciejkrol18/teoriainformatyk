"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "../ui/Input"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/Button"
import { LoaderIcon } from "lucide-react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { checkIfAccountExists, startPasswordRecovery } from "@/actions"
import { createClient } from "@/lib/supabase/client"

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email nie może być pusty" })
      .email("Nieprawidłowy adres email"),
  })
  .refine(
    async (data) => {
      const exists = await checkIfAccountExists(data.email)
      return exists
    },
    {
      message: "Konto z tym adresem email nie istnieje",
      path: ["email"],
    },
  )

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string

type PasswordRecoveryFormView = "form" | "info"

export default function PasswordRecoveryForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState<string>("")
  const [view, setView] = useState<PasswordRecoveryFormView>("form")
  const captchaRef = useRef<HCaptcha | null>(null)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onTokenSubmission = async () => {
    setLoading(true)
    const formValues = getValues()
    const { error } = await startPasswordRecovery(
      formValues.email,
      "http://localhost:3000/update-password",
      token,
    )
    if (error) {
      toast.error(`Wystąpił błąd w trakcie przetwarzania twojego żądania: ${error}`)
    }
    setLoading(false)
    captchaRef.current?.resetCaptcha()
    setView("info")
  }

  useEffect(() => {
    if (token && isSubmitted) {
      onTokenSubmission()
    }
  }, [token])

  useEffect(() => {
    setLoading(isSubmitting)
  }, [isSubmitting])

  if (view === "form") {
    return (
      <form
        onSubmit={handleSubmit(() => {
          if (captchaRef.current) {
            captchaRef.current.execute()
          }
        })}
        className="flex flex-col gap-2"
      >
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" {...register("email")} />
        <p className="text-red-500 min-h-[48px]">
          {errors.email?.message as React.ReactNode}
        </p>
        <div className="flex justify-center items-center min-h-[78px] py-6">
          <HCaptcha
            sitekey={siteKey}
            onVerify={(token) => setToken(token)}
            theme="dark"
            languageOverride="pl"
            onChalExpired={() => toast.warning("Weryfikacja wygasła")}
            onError={(error) =>
              toast.error(`Wystąpił błąd w trakcie weryfikacji: ${error}`)
            }
            ref={captchaRef}
          />
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading && <LoaderIcon className="animate-spin" />}
          {loading ? "Przetwarzanie..." : "Dalej"}
        </Button>
      </form>
    )
  } else if (view === "info") {
    return (
      <p className="my-8 text-lg text-center">
        Na podany przez ciebie adres email został wysłany link do resetowania hasła.
        Kliknij w niego aby kontynuować.
      </p>
    )
  }
}
