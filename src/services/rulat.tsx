'use server';

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getAllRulat = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('ruang_latihan')
        .select('*');
    return { data, error };
}

export const getRulatStatus = async (
    code: string
) => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('ruang_latihan')
        .select('*')
        .eq('qr_code', code);
    return { data, error };
}

export const updateRulatQRCode = async (
    nama: string,
    qr_code: string
) => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('ruang_latihan')
        .update({ qr_code })
        .eq('nama', nama);
    return { data, error };
}

export const updateRulatStatus = async (
    id: string,
    status: boolean
) => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('ruang_latihan')
        .update({ is_open: status })
        .eq('id', id);
    return { data, error };
}

export const new_log = async (
    user_id: string,
    ruang_latihan_id: string,
    act: string
) => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('log')
        .insert({ user_id, ruang_latihan_id, act });
    return { data, error };
}

export const get_log = async () => {
    const supabase = createClient(cookies());
    const { data, error } = await supabase
        .from('grouped_log_view')
        .select('*');
    return { data, error };
}