export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      easy_collections: {
        Row: {
          created_at: string
          id: number
          question_id_array: number[]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          question_id_array: number[]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          question_id_array?: number[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_easy_collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_scores: {
        Row: {
          correct: number[] | null
          created_at: string
          exam_id: number | null
          id: number
          incorrect: number[] | null
          time_finished: string
          time_started: string
          unanswered: number[] | null
          user_id: string | null
        }
        Insert: {
          correct?: number[] | null
          created_at?: string
          exam_id?: number | null
          id?: number
          incorrect?: number[] | null
          time_finished: string
          time_started: string
          unanswered?: number[] | null
          user_id?: string | null
        }
        Update: {
          correct?: number[] | null
          created_at?: string
          exam_id?: number | null
          id?: number
          incorrect?: number[] | null
          time_finished?: string
          time_started?: string
          unanswered?: number[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exam_scores_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_exam_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          code: string
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          code?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          created_at: string
          exam_id: number
          id: number
          question_id_array: number[]
          user_id: string
        }
        Insert: {
          created_at?: string
          exam_id: number
          id?: number
          question_id_array: number[]
          user_id: string
        }
        Update: {
          created_at?: string
          exam_id?: number
          id?: number
          question_id_array?: number[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_flashcards_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flashcards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hard_collections: {
        Row: {
          created_at: string
          id: number
          question_id_array: number[]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          question_id_array: number[]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          question_id_array?: number[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_hard_collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      inf02: {
        Row: {
          answers: string[] | null
          content: string | null
          correct_answer: string | null
          created_at: string | null
          id: number
          image: boolean | null
        }
        Insert: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          image?: boolean | null
        }
        Update: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          image?: boolean | null
        }
        Relationships: []
      }
      inf03: {
        Row: {
          answers: string[] | null
          content: string | null
          correct_answer: string | null
          created_at: string | null
          id: number
          image: boolean | null
        }
        Insert: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          image?: boolean | null
        }
        Update: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number
          image?: boolean | null
        }
        Relationships: []
      }
      one_question_scores: {
        Row: {
          correct: number
          created_at: string | null
          exam_id: number
          id: number
          incorrect: number
          user_id: string
        }
        Insert: {
          correct?: number
          created_at?: string | null
          exam_id: number
          id?: number
          incorrect?: number
          user_id: string
        }
        Update: {
          correct?: number
          created_at?: string | null
          exam_id?: number
          id?: number
          incorrect?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_one_question_scores_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_one_question_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          email: string
          id: number
          providers: string[]
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          email: string
          id?: number
          providers: string[]
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          email?: string
          id?: number
          providers?: string[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profile_pictures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Insert: {
          answers: string[]
          comment: string
          created_at?: string
          exam_code: string
          id?: number
          image?: boolean | null
          questions: string[]
        }
        Update: {
          answers?: string[]
          comment?: string
          created_at?: string
          exam_code?: string
          id?: number
          image?: boolean | null
          questions?: string[]
        }
        Relationships: []
      }
      questions: {
        Row: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string | null
          exam_id: number
          id: number
          image: boolean
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at?: string | null
          exam_id: number
          id?: number
          image: boolean
        }
        Update: {
          answers?: string[]
          content?: string
          correct_answer?: string
          created_at?: string | null
          exam_id?: number
          id?: number
          image?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_test_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      questions_backup: {
        Row: {
          answers: string[] | null
          category_id: number | null
          content: string | null
          correct_answer: string | null
          created_at: string | null
          id: number | null
          image: boolean | null
        }
        Insert: {
          answers?: string[] | null
          category_id?: number | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number | null
          image?: boolean | null
        }
        Update: {
          answers?: string[] | null
          category_id?: number | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: number | null
          image?: boolean | null
        }
        Relationships: []
      }
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
          image?: boolean
        }
        Relationships: []
      }
      questions_inf02_old: {
        Row: {
          answers: string[] | null
          content: string | null
          correct_answer: string | null
          created_at: string | null
          id: number
          image: string | null
        }
        Insert: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id: number
          image?: string | null
        }
        Update: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
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
          image: boolean
        }
        Insert: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string
          id?: number
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
      questions_inf03_old: {
        Row: {
          answers: string[] | null
          content: string | null
          correct_answer: string | null
          created_at: string | null
          id: number
          image: string | null
        }
        Insert: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id: number
          image?: string | null
        }
        Update: {
          answers?: string[] | null
          content?: string | null
          correct_answer?: string | null
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
      change_user_password: {
        Args: {
          current_plain_password: string
          new_plain_password: string
        }
        Returns: Json
      }
      get_random_questions: {
        Args: {
          amount: number
          exam_id: number
        }
        Returns: {
          answers: string[]
          content: string
          correct_answer: string
          created_at: string | null
          exam_id: number
          id: number
          image: boolean
        }[]
      }
      reset_user_stats: {
        Args: {
          current_plain_password: string
        }
        Returns: Json
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
