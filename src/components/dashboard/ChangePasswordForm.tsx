"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "../ui/Input"
import React from "react"
import { toast } from "sonner"
import { changePassword } from "@/app/(default)/dashboard/actions"

const schema = z
  .object({
    password: z.string().min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Hasła nie są identyczne",
    path: ["confirm"],
  })

export default function ChangePasswordForm() {
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
        const error = await changePassword(data)
        if (error) {
          toast.error("W trakcie zmiany hasła wystąpił błąd. Spróbuj ponownie")
          return
        }
      })}
      className="w-full max-w-[500px] flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Nowe hasło</label>
        <Input id="password" type="password" {...register("password")} />
        {errors.paswwordOne?.message && (
          <p className="text-red-500">{errors.password?.message as React.ReactNode}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm">Potwierdź hasło</label>
        <Input id="confirm" type="password" {...register("confirm")} />
        {errors.confirm?.message && (
          <p className="text-red-500">{errors.confirm?.message as React.ReactNode}</p>
        )}
      </div>
      <Input
        type="submit"
        value="Zatwierdź zmiany"
        className="bg-primary hover:cursor-pointer"
      />
    </form>
  )
}
