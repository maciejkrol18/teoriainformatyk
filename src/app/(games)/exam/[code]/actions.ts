'use server'

import getUser from '@/lib/supabase/get-user'
import { createClient } from '@/lib/supabase/server'
import type { ExamScore } from '@/types/exam-score'

export async function saveScore(
  score: ExamScore,
): Promise<{ message: string; error: boolean }> {
  const { user } = await getUser()

  if (user) {
    const supabase = createClient()
    const { error } = await supabase.from('exam_scores').insert({
      ...score,
      user_id: user.id,
    })
    if (error) {
      return {
        message: `Błąd zapisywania wyniku: ${error.message}`,
        error: true,
      }
    }
    return {
      message: 'Wynik zapisany',
      error: false,
    }
  }
  return {
    message: 'Zaloguj się, aby zapisać swój wynik',
    error: false,
  }
}
