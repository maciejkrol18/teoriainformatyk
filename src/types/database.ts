export interface Database {
  public: {
    Tables: {
      inf02: {
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
          id: number
          image: boolean
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
          id?: number
          image?: boolean
        }
        Relationships: []
      }
      inf03: {
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
          id: number
          image?: boolean
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
          id?: number
          image?: boolean
        }
        Relationships: []
      }
      query_training: {
        Row: {
          answers: string[]
          comment: string
          created_at: string
          exam_code: string
          id: number
          image: boolean | null
          questions: string[]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
