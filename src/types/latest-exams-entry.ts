export interface LatestExamScoresEntry {
  exam_id: number | null;
  percentage_score: number;
  created_at: string;
  exams: {
    name: string;
  } | null;
}
