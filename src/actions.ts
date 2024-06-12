"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { FieldValues } from "react-hook-form"
import { AuthError, PostgrestError } from "@supabase/supabase-js"

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

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath("/login", "layout")
  redirect("/login")
}

export async function changePassword(
  formData: FieldValues,
): Promise<PostgrestError | null> {
  const supabase = createClient()

  const data = {
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
  }

  const { error } = await supabase.rpc("change_user_password", {
    current_plain_password: data.currentPassword,
    new_plain_password: data.newPassword,
  })

  if (error) {
    return error
  }

  await supabase.auth.signOut()

  revalidatePath("/login", "layout")
  redirect("/login")
}

export async function resetStats(formData: FieldValues): Promise<PostgrestError | null> {
  const supabase = createClient()

  const data = {
    currentPassword: formData.currentPassword,
  }

  const { error } = await supabase.rpc("reset_user_stats", {
    current_plain_password: data.currentPassword,
  })

  if (error) {
    return error
  }

  revalidatePath("/dashboard", "layout")
  redirect("/dashboard")
}

export async function deleteAccount(
  formData: FieldValues,
): Promise<PostgrestError | null> {
  const supabase = createClient()

  const data = {
    currentPassword: formData.currentPassword,
  }

  const { error } = await supabase.rpc("delete_user_account", {
    current_plain_password: data.currentPassword,
  })

  if (error) {
    return error
  }

  await supabase.auth.signOut()

  revalidatePath("/", "layout")
  redirect("/")
}