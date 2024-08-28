'use server'

import { createClient } from '@/lib/supabase/server'

export async function deleteExamScores(
  scoresToDelete: string[],
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('exam_scores')
    .delete()
    .in('score_id', scoresToDelete)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, error: null }
}
