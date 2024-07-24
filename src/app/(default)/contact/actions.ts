'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveContact(
  email: string,
  contactType: string,
  content: string,
  token: string,
): Promise<{ success: boolean; error: string | null }> {
  const isCaptchaTokenValid = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: process.env.NEXT_PUBLIC_HCAPTCHA_SECRET_KEY!,
      sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!,
      response: token,
    }),
  })
    .then((res) => res.json())
    .then((data: any) => data['success'] as boolean)

  if (!isCaptchaTokenValid) {
    return {
      success: false,
      error: 'Token weryfikacji hCaptcha jest nieprawidłowy',
    }
  }

  const supabase = createClient()

  const { error } = await supabase.from('contact').insert({
    email: email,
    type: contactType,
    content: content,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  } else {
    return {
      success: true,
      error: null,
    }
  }
}
