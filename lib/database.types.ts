// supabase gen types typescript --project-id <project-id>

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          author_id: string;
          content: string | null;
          created_at: string | null;
          id: number;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          author_id: string;
          content?: string | null;
          created_at?: string | null;
          id?: number;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          content?: string | null;
          created_at?: string | null;
          id?: number;
          title?: string | null;
          updated_at?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
