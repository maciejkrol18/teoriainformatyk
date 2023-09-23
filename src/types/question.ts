import { Database } from "./database"

export type Question = {
  answers: string[]
  content: string
  correct_answer: string
  id: number
  image: boolean
}
