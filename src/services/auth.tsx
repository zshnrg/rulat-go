'use server';

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { AccountCredentialsPayload } from "@/lib/databasetypes";

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

export const signIn = async (accountCredentials: AccountCredentialsPayload) => {
    const supabase = createClient(cookies());
    const query = supabase.auth.signInWithPassword({
        ...accountCredentials
      });
      const { data, error } = await query;
    return { data, error };
}

export const signOut = async () => {
    const supabase = createClient(cookies());
    const { error } = await supabase.auth.signOut();
    return { error };
}

export const self = async () => {
    const supabase = createClient(cookies());
    const { data : {
        session
    }} = await supabase.auth.getSession();
    return { data : {session} };
}

export const updatePassword = async (new_password: any) => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.auth.updateUser({
        password: new_password
    });
    return { data, error };
}
