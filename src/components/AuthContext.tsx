"use client"

import { User } from "@supabase/supabase-js"
import { createContext } from "react"

export const AuthContext = createContext<User | null>(null)
