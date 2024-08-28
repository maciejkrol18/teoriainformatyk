'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/Select'
import type HCaptcha from '@hcaptcha/react-hcaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { saveContact } from './actions'
import { Loader } from 'lucide-react'
import Captcha from '@/components/auth/Captcha'

interface ContactFormProps {
  email?: string
  contactType?: string
  content?: string
}

const schema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres email' }),
  contactType: z.string().min(1, { message: 'Wybierz rodzaj wiadomości' }),
  content: z.string().min(10, { message: 'Wiadomość musi mieć przynajmniej 10 znaków' }),
  token: z.string().min(1, { message: 'Weryfikacja hCaptcha jest wymagana' }),
})

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string

export default function ContactForm({ email, contactType, content }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const captchaRef = useRef<HCaptcha | null>(null)

  const handleCaptchaChange = (token: string) => {
    setValue('token', token, { shouldValidate: true })
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        const { success, error } = await saveContact(
          data.email,
          data.contactType,
          data.content,
          data.token,
        )
        if (success) {
          toast.success('Wiadomość została wysłana. Dziękujemy!')
        }
        if (error) {
          toast.error(`Wystąpił błąd w trakcie wysyłania wiadomości: ${error}`)
        }
        captchaRef.current?.resetCaptcha()
        reset()
      })}
    >
      <div>
        <label htmlFor="email">Twój adres email</label>
        <p className="text-sm text-muted">
          Na ten adres email zostanie wysłana odpowiedź na Twoją wiadomość
        </p>
      </div>
      <Input
        id="email"
        type="email"
        {...register('email')}
        defaultValue={email || undefined}
      />
      <p className="text-red-500 min-h-[24px]">
        {errors.email?.message as React.ReactNode}
      </p>
      <div>
        <label htmlFor="contactType">Rodzaj wiadomości</label>
        <ul className="text-muted text-sm leading-relaxed">
          <li>Ogólne - ogólne pytania</li>
          <li>
            Zgłoszenie błędu - zgłaszanie błędów w działaniu strony lub jej zawartości
          </li>
          <li>Pomoc - pytania związane z obsługą strony</li>
          <li>
            Sugestia rozwoju strony - pomysły dotyczące nowych funkcjonalności strony lub
            ulepszenia tych już istniejących
          </li>
          <li>Współpraca - reklama Twojego produktu etc.</li>
        </ul>
      </div>
      <Controller
        control={control}
        name="contactType"
        render={({ field: { onChange, value } }) => (
          <Select
            value={value}
            onValueChange={(value) => onChange(value)}
            defaultValue={contactType || undefined}
          >
            <SelectTrigger id="contactType">
              <SelectValue placeholder="Wybierz rodzaj wiadomości" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Ogólne</SelectItem>
              <SelectItem value="report">Zgłoszenie błędu</SelectItem>
              <SelectItem value="help">Pomoc</SelectItem>
              <SelectItem value="suggestion">Sugestia rozwoju strony</SelectItem>
              <SelectItem value="business">Współpraca</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <p className="text-red-500 min-h-[24px]">
        {errors.contactType?.message as React.ReactNode}
      </p>
      <label htmlFor="content">Treść wiadomości</label>
      <textarea
        id="message"
        placeholder="Tutaj wpisz swoją wiadomość"
        {...register('content')}
        defaultValue={content || undefined}
        className="border border-background-bright bg-background-light p-2 text-sm rounded-md"
      ></textarea>
      <p className="text-red-500 min-h-[24px]">
        {errors.content?.message as React.ReactNode}
      </p>
      <div className="mt-4">
        <Captcha handleCaptchaChange={handleCaptchaChange} captchaRef={captchaRef} />
      </div>
      <input type="hidden" {...register('token')} />
      <p className="text-red-500 min-h-[48px]">
        {errors.token?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary">
        {isSubmitting && <Loader className="animate-spin" />}
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </Button>
    </form>
  )
}
