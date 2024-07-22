"use server"

import { createClient } from "./server"

export default async function getUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  return {
    user: data.user,
    error: error?.message,
  }
}
