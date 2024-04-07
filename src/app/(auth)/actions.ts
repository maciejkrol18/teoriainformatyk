"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { FieldValues } from "react-hook-form"
import { AuthError, Provider } from "@supabase/supabase-js"

export async function signIn(formData: FieldValues): Promise<AuthError | null> {
  const supabase = createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return error
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signUp(formData: FieldValues): Promise<AuthError | null> {
  const supabase = createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return error
  }

  revalidatePath("/", "layout")
  redirect("/confirm-signup")
}
