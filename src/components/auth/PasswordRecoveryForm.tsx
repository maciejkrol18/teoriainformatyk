'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/Input'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { LoaderIcon } from 'lucide-react'
import type HCaptcha from '@hcaptcha/react-hcaptcha'
import { checkIfAccountExists, startPasswordRecovery } from '@/app/(auth)/actions'
import Captcha from './Captcha'

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email nie może być pusty' })
      .email('Nieprawidłowy adres email'),
    token: z.string().min(1, { message: 'Weryfikacja hCaptcha jest wymagana' }),
  })
  .refine(
    async (data) => {
      const exists = await checkIfAccountExists(data.email)
      return exists
    },
    {
      message: 'Konto z tym adresem email nie istnieje',
      path: ['email'],
    },
  )

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string

type PasswordRecoveryFormView = 'form' | 'info'

export default function PasswordRecoveryForm() {
  const [view, setView] = useState<PasswordRecoveryFormView>('form')
  const captchaRef = useRef<HCaptcha | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleCaptchaChange = (token: string) => {
    setValue('token', token, { shouldValidate: true })
  }

  if (view === 'form') {
    return (
      <form
        onSubmit={handleSubmit(async (data) => {
          const { error } = await startPasswordRecovery(
            data.email,
            data.token,
            window ? window.location.origin : 'http://localhost:3000',
          )
          if (error) {
            toast.error(`Wystąpił błąd w trakcie przetwarzania formularza: ${error}`)
          } else {
            setView('info')
          }
          captchaRef.current?.resetCaptcha()
        })}
        className="flex flex-col gap-4"
      >
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" {...register('email')} />
        <p className="text-red-500 min-h-[48px]">
          {errors.email?.message as React.ReactNode}
        </p>
        <div className="flex justify-center items-center min-h-[78px] py-6">
          <Captcha handleCaptchaChange={handleCaptchaChange} captchaRef={captchaRef} />
        </div>
        <input type="hidden" {...register('token')} />
        <p className="text-red-500 min-h-[48px]">
          {errors.token?.message as React.ReactNode}
        </p>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting && <LoaderIcon className="animate-spin" />}
          {isSubmitting ? 'Przetwarzanie...' : 'Dalej'}
        </Button>
      </form>
    )
  } else if (view === 'info') {
    return (
      <p>
        Na podany przez ciebie adres email został wysłany link do resetowania hasła. W
        treści wiadomości znajdują się dalsze instrukcje.
      </p>
    )
  }
}
