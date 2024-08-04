'use server'

import { createClient } from '@/lib/supabase/server'

export async function incrementCorrect(
  userId: string,
  examId: number,
): Promise<string | undefined> {
  const supabase = createClient()
  const { error } = await supabase.rpc('one_question_increment_correct', {
    user_id: userId,
    exam_id: examId,
  })
  if (error) {
    return error.message
  }
}

export async function incrementIncorrect(
  userId: string,
  examId: number,
): Promise<string | undefined> {
  const supabase = createClient()
  const { error } = await supabase.rpc('one_question_increment_incorrect', {
    user_id: userId,
    exam_id: examId,
  })
  if (error) {
    return error.message
  }
}
