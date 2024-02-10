import { createClient } from '@supabase/supabase-js'

export const removeUser = async (id: string) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );
    
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    return { data, error };
}