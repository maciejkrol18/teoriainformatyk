"use server";

import { createClient } from "@/lib/supabase/server";

export async function addToKnownQuestions(examId: number, questionId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("add_to_done_flashcards", {
    exam_id: examId,
    question_id: questionId,
  });

  return {
    data: data,
    error: error,
  };
}

export async function deleteKnownQuestions(examId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("remove_all_flashcards", {
    exam_id: examId,
  });

  return {
    data: data,
    error: error,
  };
}
