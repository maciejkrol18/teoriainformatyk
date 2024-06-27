"use server"

import { createClient } from "./server"

export default async function getSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  return {
    session: data.session,
    error: error,
  }
}
