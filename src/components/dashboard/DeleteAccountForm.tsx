'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/Input'
import type React from 'react'
import { toast } from 'sonner'
import { deleteAccount } from '@/app/(default)/dashboard/actions'

const CONFIRMATION_PHRASE = 'Chcę usunąć swoje konto'

const schema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Hasło nie może być puste' }),
    confirmationPhrase: z.string(),
  })
  .refine((data) => data.confirmationPhrase === CONFIRMATION_PHRASE, {
    message: 'Nieprawidłowa fraza potwierdzająca',
    path: ['confirmationPhrase'],
  })

export default function DeleteAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const error = await deleteAccount(data)
        if (error) {
          toast.error(`Wystąpił błąd: ${error.message}`)
          resetField('currentPassword')
          return
        }
      })}
      className="w-full max-w-[500px] flex flex-col gap-4 bg-background-bright p-4 rounded-lg"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="currentPassword">Twoje hasło</label>
        <Input id="currentPassword" type="password" {...register('currentPassword')} />
        {errors.currentPassword?.message && (
          <p className="text-red-500">
            {errors.currentPassword?.message as React.ReactNode}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmationPhrase">
          Potwierdź usunięcie (wpisz &quot;{CONFIRMATION_PHRASE}&quot;)
        </label>
        <Input id="confirmationPhrase" type="text" {...register('confirmationPhrase')} />
        {errors.confirmationPhrase?.message && (
          <p className="text-red-500">
            {errors.confirmationPhrase?.message as React.ReactNode}
          </p>
        )}
      </div>
      <Input
        type="submit"
        value="Zatwierdź"
        className="bg-primary hover:cursor-pointer"
      />
    </form>
  )
}
