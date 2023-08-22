export type ExamQuestion = {
  answers: string[]
  content: string
  correct_answer: string
  selected_answer: string | null
  correct_selected: boolean
  id: number
  image: string | null
}
