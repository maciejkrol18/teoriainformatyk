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

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email nie może być pusty" })
    .email("Nieprawidłowy adres email"),
  password: z.string().min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
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
        const error = await signIn(data)
        if (error && error.status === 400) {
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
      <p className="text-red-500 min-h-[24px]">
        {errors.password?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading && <LoaderIcon className="animate-spin" />}
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  )
}
