export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions_inf03: {
        Row: {
          answers: Json
          content: string
          correctAnswer: string
          created_at: string | null
          id: number
          image: string | null
        }
        Insert: {
          answers: Json
          content: string
          correctAnswer: string
          created_at?: string | null
          id: number
          image?: string | null
        }
        Update: {
          answers?: Json
          content?: string
          correctAnswer?: string
          created_at?: string | null
          id?: number
          image?: string | null
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
