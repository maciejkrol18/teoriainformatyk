export interface HardestQuestionsEntry {
  created_at: string;
  question_id: number;
  count: number;
  questions: {
    content: string;
  } | null;
}
