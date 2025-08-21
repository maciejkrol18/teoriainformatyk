interface ExamHistoryEntry {
  created_at: string;
  exam_id: number | null;
  user_id: string | null;
  score_id: string;
  percentage_score: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  time_took: string;
  exams: {
    name: string;
  } | null;
}
