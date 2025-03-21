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
      catalogs: {
        Row: {
          description: string | null
          download_url: string | null
          file_size: string | null
          file_type: string | null
          id: number
          is_public: boolean | null
          name: string
          upload_date: string | null
        }
        Insert: {
          description?: string | null
          download_url?: string | null
          file_size?: string | null
          file_type?: string | null
          id?: number
          is_public?: boolean | null
          name: string
          upload_date?: string | null
        }
        Update: {
          description?: string | null
          download_url?: string | null
          file_size?: string | null
          file_type?: string | null
          id?: number
          is_public?: boolean | null
          name?: string
          upload_date?: string | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          business_hours: string
          email: string
          id: number
          phone: string
          updated_at: string | null
        }
        Insert: {
          address: string
          business_hours: string
          email: string
          id?: number
          phone: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          business_hours?: string
          email?: string
          id?: number
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: number
          interest: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: number
          interest: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: number
          interest?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      content_pages: {
        Row: {
          content: string
          id: number
          page_type: string
          updated_at: string | null
        }
        Insert: {
          content: string
          id?: number
          page_type: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          id?: number
          page_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      dropdown_items: {
        Row: {
          created_at: string | null
          display_order: number
          href: string
          id: number
          is_active: boolean | null
          name: string
          navigation_item_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order: number
          href: string
          id?: number
          is_active?: boolean | null
          name: string
          navigation_item_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number
          href?: string
          id?: number
          is_active?: boolean | null
          name?: string
          navigation_item_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dropdown_items_navigation_item_id_fkey"
            columns: ["navigation_item_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          content: string
          id: number
          subject: string
          template_type: string
          updated_at: string | null
        }
        Insert: {
          content: string
          id?: number
          subject: string
          template_type: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          id?: number
          subject?: string
          template_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string
          created_at: string | null
          education: string
          email: string
          experience: string
          first_name: string
          id: number
          last_name: string
          phone: string
          position: string
          resume_url: string | null
          willing_to_relocate: boolean | null
          work_permit: boolean | null
        }
        Insert: {
          cover_letter: string
          created_at?: string | null
          education: string
          email: string
          experience: string
          first_name: string
          id?: number
          last_name: string
          phone: string
          position: string
          resume_url?: string | null
          willing_to_relocate?: boolean | null
          work_permit?: boolean | null
        }
        Update: {
          cover_letter?: string
          created_at?: string | null
          education?: string
          email?: string
          experience?: string
          first_name?: string
          id?: number
          last_name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          willing_to_relocate?: boolean | null
          work_permit?: boolean | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          created_at: string | null
          id: number
          name: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          url?: string
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string | null
          display_order: number
          has_dropdown: boolean | null
          href: string
          id: number
          is_active: boolean | null
          location: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order: number
          has_dropdown?: boolean | null
          href: string
          id?: number
          is_active?: boolean | null
          location: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number
          has_dropdown?: boolean | null
          href?: string
          id?: number
          is_active?: boolean | null
          location?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          specifications: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          specifications?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          specifications?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          platform: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          platform: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          platform?: string
          updated_at?: string | null
          url?: string
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
