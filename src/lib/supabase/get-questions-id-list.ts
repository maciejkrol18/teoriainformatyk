'use server'

import { createClient } from './server'

export default async function getQuestionIdsList(examId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('questions')
    .select('id')
    .eq('exam_id', examId)

  if (!data || data.length < 1 || error) {
    throw new Error('Failed to fetch questions from the database')
  } else {
    return data.map((obj) => obj.id)
  }
}
