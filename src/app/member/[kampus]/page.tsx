'use client'

import { useEffect } from "react";
import { self } from "@/services/auth";
import { SearchUser } from "@/components/search_user";
import { useRouter } from "next/navigation";

export default function Member({params}: {params: {kampus: string}}) {
    const router = useRouter();

    async function getSession() {
        const { data: { session } } = await self();
        if (session) {
            if (session.user?.user_metadata?.nama_lengkap === "Admin") {
                router.push("/admin");
            } else {
                router.push("/scan/" + params.kampus.charAt(0).toLowerCase());
            }
        }
    }

    useEffect(() => {
        getSession();

    }, []);

    function onSuccessRedirect() {
        getSession();
    }

    return (
        <div>
            <SearchUser kampus={params.kampus === "g"? "Ganesha" : "Jatinangor"} onSuccess={onSuccessRedirect}/>
        </div>
    );
}