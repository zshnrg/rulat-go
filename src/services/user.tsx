'use server';

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase.from('users').select('*');
    return { data, error };
}

export const getUserByNIM = async (nim: string) => {
    const supabase = createClient(cookies());
    // select only the user with the given NIM TPB or NIM Jurusan
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`nim_tpb.eq.${nim},nim_jurusan.eq.${nim}`);
    return { data, error };
}