"use client"

import { Session } from "@supabase/supabase-js"
import { createContext } from "react"

export const AuthContext = createContext<Session | null>(null)
