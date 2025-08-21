export interface ExamHistoryFilters {
  user: string;
  page: string;
  examId?: string;
  scoreLessThan?: string;
  scoreMoreThan?: string;
  sortBy?: string;
}
