export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channels: {
        Row: {
          id: number
          slug: string
          inserted_at: string
        }
        Insert: {
          id?: number
          slug: string
          inserted_at?: string
        }
        Update: {
          id?: number
          slug?: string
          inserted_at?: string
        }
      }
      dice_rolls: {
        Row: {
          id: number
          dice_notation: string | null
          result: number | null
          user_id: string
          channel_id: number
          inserted_at: string
        }
        Insert: {
          id?: number
          dice_notation?: string | null
          result?: number | null
          user_id: string
          channel_id: number
          inserted_at?: string
        }
        Update: {
          id?: number
          dice_notation?: string | null
          result?: number | null
          user_id?: string
          channel_id?: number
          inserted_at?: string
        }
      }
      users: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
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
  }
}

