import { Database } from "@/types/database"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
)

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
