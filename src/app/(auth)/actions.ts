'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { FieldValues } from 'react-hook-form'
import {
  Provider,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'

export async function signIn(formData: FieldValues): Promise<{
  error: string
}> {
  const supabase = createClient()

  const data: SignInWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
    options: {
      captchaToken: formData.token,
    },
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      error: error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function socialSignIn(
  provider: Provider,
  origin: string,
): Promise<
  | {
      error: string
    }
  | undefined
> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })
  if (error) {
    console.log(error)
    return {
      error: error.message,
    }
  }
  if (data.url) {
    redirect(data.url)
  }
}

export async function signUp(
  formData: FieldValues,
  redirectTo: string,
): Promise<{
  error: string
}> {
  const supabase = createClient()

  const data: SignUpWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
    options: {
      captchaToken: formData.token,
      emailRedirectTo: redirectTo,
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return {
      error: error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/confirm-signup')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/login', 'layout')
  redirect('/login')
}

export async function startPasswordRecovery(
  email: string,
  captchaToken: string,
  redirectTo: string,
) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken: captchaToken,
    redirectTo: redirectTo,
  })

  return {
    data: data,
    error: error?.message,
  }
}

export async function updatePassword(formData: FieldValues): Promise<string> {
  const supabase = createClient()

  const data = {
    newPassword: formData.newPassword,
  }

  const { error } = await supabase.auth.updateUser({ password: data.newPassword })

  if (error) {
    return error.message
  }

  await supabase.auth.signOut()

  revalidatePath('/login', 'layout')
  redirect('/login')
}

export async function checkIfAccountExists(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('check_account_exists', {
    email_to_check: email,
  })

  if (error) {
    console.log(error)
    return false
  }
  return Boolean(data)
}
