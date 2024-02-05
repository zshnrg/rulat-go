'use server';

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Payload } from "@/lib/databasetypes";

export const registerMember = async (
    nim_tpb: string,
    nim_jurusan: string,
    nama_lengkap: string,
    nama_panggilan: string,
    angkatan: number
    ) => {
    const supabase = createClient(cookies());
    const query = supabase.auth.signUp({
        email: nim_tpb + "@mail.com",
        password: nim_tpb,
        options: {
            data: {
                nim_tpb,
                nim_jurusan,
                nama_lengkap,
                nama_panggilan,
                angkatan,
            },
        }
    });
    const { data, error } = await query;
    return { data, error };
}