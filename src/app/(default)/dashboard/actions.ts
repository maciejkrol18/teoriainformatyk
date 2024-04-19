"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { FieldValues } from "react-hook-form"
import { AuthError } from "@supabase/supabase-js"

export async function changePassword(formData: FieldValues): Promise<AuthError | null> {
  const supabase = createClient()

  const data = {
    password: formData.password,
    confirm: formData.confirm,
  }

  const { error } = await supabase.auth.updateUser({ password: data.password })

  if (error) {
    return error
  }

  await supabase.auth.signOut()

  revalidatePath("/login", "layout")
  redirect("/login")
}
