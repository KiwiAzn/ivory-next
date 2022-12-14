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
      channel_members: {
        Row: {
          channel_id: number
          user_id: string
        }
        Insert: {
          channel_id: number
          user_id: string
        }
        Update: {
          channel_id?: number
          user_id?: string
        }
      }
      channels: {
        Row: {
          id: number
          slug: string
          created_by: string
          inserted_at: string
        }
        Insert: {
          id?: number
          slug: string
          created_by: string
          inserted_at?: string
        }
        Update: {
          id?: number
          slug?: string
          created_by?: string
          inserted_at?: string
        }
      }
      dice_rolls: {
        Row: {
          id: number
          notation: string | null
          breakdown: string | null
          total: number | null
          user_id: string
          channel_id: number
          inserted_at: string
        }
        Insert: {
          id?: number
          notation?: string | null
          breakdown?: string | null
          total?: number | null
          user_id: string
          channel_id: number
          inserted_at?: string
        }
        Update: {
          id?: number
          notation?: string | null
          breakdown?: string | null
          total?: number | null
          user_id?: string
          channel_id?: number
          inserted_at?: string
        }
      }
      users: {
        Row: {
          id: string
          display_name: string | null
        }
        Insert: {
          id: string
          display_name?: string | null
        }
        Update: {
          id?: string
          display_name?: string | null
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

