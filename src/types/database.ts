export interface Database {
  public: {
    Tables: {
      questions_inf02: {
        Row: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id: number
          image: boolean
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id?: number
          image: boolean
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
          id?: number
          image: boolean
        }
        Relationships: []
      }
      questions_inf03: {
        Row: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id: number
          image: boolean
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id?: number
          image: boolean
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
          id?: number
          image: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
