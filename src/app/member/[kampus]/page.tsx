'use client'

import { useEffect } from "react";
import { self } from "@/services/auth";
import { SearchUser } from "@/components/search_user";

export default function Member({params}: {params: {kampus: string}}) {

    useEffect(() => {

        async function getSession() {
            const { data: { session } } = await self();
            if (session) {
                console.log(session);
                if (session.user?.user_metadata?.nama_lengkap === "Admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/scan";
                }
            }
        }

        getSession();

    }, []);

    function onSuccessRedirect() {
        // reload the page
        window.location.href = "/member/" + params.kampus;
    }

    return (
        <div>
            <SearchUser kampus={params.kampus === "g"? "Ganesha" : "Jatinangor"} onSuccess={onSuccessRedirect}/>
        </div>
    );
}