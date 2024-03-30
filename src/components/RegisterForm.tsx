"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "./ui/Input"
import React from "react"
import { signup } from "@/app/(special)/login/actions"
import { toast } from "sonner"

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email nie może być pusty" })
    .email("Nieprawidłowy adres email"),
  password: z.string().min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
})

export default function RegisterForm() {
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
        const error = await signup(data)
        if (error) {
          toast.error("W trakcie rejestracji wystąpił błąd")
          return
        }
        toast.success("Zarejestrowano")
      })}
      className="w-full flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email?.message as React.ReactNode}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Hasło</label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password?.message && (
          <p className="text-red-500">{errors.password?.message as React.ReactNode}</p>
        )}
        <Input
          type="submit"
          value="Stwórz konto"
          className="bg-primary hover:cursor-pointer"
        />
      </div>
    </form>
  )
}
