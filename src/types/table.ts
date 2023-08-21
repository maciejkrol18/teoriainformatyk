import { Database } from "./database"

export type Table = keyof Database["public"]["Tables"]
