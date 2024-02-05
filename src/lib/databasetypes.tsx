import { PostgrestError } from '@supabase/supabase-js';

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
    ? Exclude<U, null>
    : never;
export type DbResultErr = PostgrestError;

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];
export type Payload<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update'];

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    nim_tpb: string;
                    nim_jurusan: string | null;
                    nama_lengkap: string | null;
                    nama_panggilan: string | null;
                    angkatan: number | null;
                    created_at: string | null;
                };
                Insert: {
                    nim_tpb: string;
                    nim_jurusan?: string;
                    nama_lengkap?: string | null;
                    nama_panggilan?: string | null;
                    angkatan?: number | null;
                };
                Update: {
                    nim_tpb?: string;
                    nim_jurusan?: string;
                    nama_lengkap?: string | null;
                    nama_panggilan?: string | null;
                    angkatan?: number | null;
                };
                Relationships: [];
            };
            ruang_latihan: {
                Row: {
                    id: string;
                    nama: string;
                    alamat: string | null;
                    is_open: boolean;
                    created_at: string | null;
                    qr_code: string;
                };
                Insert: {
                    nama: string;
                    alamat?: string;
                    qr_code: string;
                };
                Update: {
                    nama?: string;
                    alamat?: string;
                    is_open?: boolean;
                };
                Relationships: [];
            };
            log: {
                Row: {
                    id: string;
                    created_at: string | null;
                    user_id: string;
                    ruang_latihan_id: string;
                    act: string | null;
                };
                Insert: {
                    user_id: string;
                    ruang_latihan_id: string;
                    act: string | null;
                };
                Update: {};
                Relationships: [];
            };
        };
        Views: {  
            grouped_log_view: {
                Row: {
                    nama_ruang_latihan: string;
                    is_open: boolean;
                    log_date: string;
                    log_time: string;
                    act: string;
                    name: string | null;
                    nim_tpb: string | null;
                    nim_jurusan: string | null;
                    angkatan: number | null;
                };
            };
        }
    };
};

export interface UserPayload {
    email?: string;
    password?: string;
    nim_tpb?: string;
    nim_jurusan?: string;
    nama_lengkap?: string;
    nama_panggilan?: string;
    angkatan?: number;
}

export interface AccountCredentialsPayload {
    email: string;
    password: string;
}