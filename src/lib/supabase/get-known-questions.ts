"use server"

import { createClient } from "./server"

export default async function getKnownQuestions(userId: string, examId: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("flashcards")
    .select("question_id_array")
    .eq("user_id", userId)
    .eq("exam_id", examId)
    .single()
  if (!data || error) {
    return []
  } else {
    return data.question_id_array
  }
}
