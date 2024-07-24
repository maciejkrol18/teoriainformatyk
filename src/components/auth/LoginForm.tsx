'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/Input'
import { useRef, useState } from 'react'
import { signIn } from '@/app/(auth)/actions'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import HCaptcha from '@hcaptcha/react-hcaptcha'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email nie może być pusty' })
    .email('Nieprawidłowy adres email'),
  password: z.string(),
  token: z.string().min(1, { message: 'Weryfikacja hCaptcha jest wymagana' }),
})

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const captchaRef = useRef<HCaptcha | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleCaptchaChange = (token: string) => {
    setValue('token', token, { shouldValidate: true })
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true)
        const { error } = await signIn(data)
        if (error) {
          toast.error('Błędne dane logowania')
          setLoading(false)
        } else {
          toast.success('Zalogowano')
        }
        captchaRef.current?.resetCaptcha()
      })}
      className="flex flex-col gap-2"
    >
      <label htmlFor="email">Email</label>
      <Input id="email" type="email" {...register('email')} />
      <p className="text-red-500 min-h-[24px]">
        {errors.email?.message as React.ReactNode}
      </p>
      <label htmlFor="password">Hasło</label>
      <Input id="password" type="password" {...register('password')} />
      <Link href="/password-recovery" className="text-accent">
        Nie pamiętam hasła
      </Link>
      <div className="flex justify-center items-center min-h-[78px] py-6">
        <HCaptcha
          sitekey={siteKey}
          onVerify={handleCaptchaChange}
          theme="dark"
          languageOverride="pl"
          onChalExpired={() => toast.warning('Weryfikacja Captcha wygasła')}
          onError={(error) =>
            toast.error(`Wystąpił błąd w trakcie weryfikacji Captcha: ${error}`)
          }
          ref={captchaRef}
        />
      </div>
      <input type="hidden" {...register('token')} />
      <p className="text-red-500 min-h-[48px]">
        {errors.token?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading && <LoaderIcon className="animate-spin" />}
        {loading ? 'Logowanie...' : 'Zaloguj się'}
      </Button>
    </form>
  )
}
