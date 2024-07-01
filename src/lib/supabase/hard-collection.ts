"use server"

import getUser from "./get-user"
import { createClient } from "./server"

async function getHardCollection() {
  const supabase = createClient()
  const { user } = await getUser()
  if (user) {
    const { data, error } = await supabase
      .from("hard_collections")
      .select("question_id_array")
      .eq("user_id", user.id)
      .single()
    if (error) {
      return error.code === "PGRST116" ? [] : null
    } else {
      return data.question_id_array ?? null
    }
  } else {
    return null
  }
}

async function addToHardCollection(id: number) {
  const supabase = createClient()
  const { data } = await supabase.rpc("add_to_hard_collection", { newid: id })
  return data
}

async function removeFromHardCollection(id: number) {
  const supabase = createClient()
  const { data } = await supabase.rpc("remove_from_hard_collection", { idtoremove: id })
  return data
}

export { getHardCollection, addToHardCollection, removeFromHardCollection }
