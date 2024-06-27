import { createClient } from "./client"

export default async function getSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  return {
    session: data.session,
    error: error,
  }
}
