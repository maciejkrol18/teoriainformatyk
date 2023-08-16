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
      questions_inf02: {
        Row: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id: number
          image: string | null
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id?: number
          image?: string | null
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
          id?: number
          image?: string | null
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
          image: string | null
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id?: number
          image?: string | null
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string
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
