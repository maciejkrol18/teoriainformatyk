"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "../ui/Input"
import { useState } from "react"
import { signIn } from "@/actions"
import { toast } from "sonner"
import { Button } from "../ui/Button"
import { LoaderIcon } from "lucide-react"
import Link from "next/link"

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email nie może być pusty" })
    .email("Nieprawidłowy adres email"),
  password: z.string(),
})

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true)
        const { error } = await signIn(data)
        if (error) {
          toast.error("Błędne dane logowania")
          setLoading(false)
        } else {
          toast.success("Zalogowano")
        }
      })}
      className="flex flex-col gap-2"
    >
      <label htmlFor="email">Email</label>
      <Input id="email" type="email" {...register("email")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.email?.message as React.ReactNode}
      </p>
      <label htmlFor="password">Hasło</label>
      <Input id="password" type="password" {...register("password")} />
      <Link href="/password-recovery" className="text-accent">
        Nie pamiętam hasła
      </Link>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading && <LoaderIcon className="animate-spin" />}
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  )
}
