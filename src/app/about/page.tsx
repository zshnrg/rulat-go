'use client';

import Header from "@/components/header";
import { signOut, self } from "@/services/auth";
import { useState, useEffect } from "react";

export default function About() {
    const [session, setSession] = useState(false);

    useEffect(() => {
        async function GET() {
            const { data: { session } } = await self();
            if (session) {
                setSession(true);
            }
        }
        GET();
    }, []);
    
    async function POST() {
        const { error } = await signOut();
        if (error) {
            console.log(error.message);
        }
        window.location.href = "/";
    }

    return (
        <div>
            <Header line1="Tentang" line2="Kami"/>
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <div className="flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4">
                        <h1 className="text-2xl text-center">RULAT GO!</h1>
                        <p className="text-xs text-center">
                        <br/>
                        APLIKASI INI DIBUAT UNTUK MEMPERMUDAH PENGECEKAN KONDISI RULAT. GUNAKAN DENGAN BIJAKSANA YA!
                        <br/><br/>
                        ILLUSTRASI - ROZAN<br/>
                        DEVELOPER - ROZAN<br/>
                        MRT - ALYA IZZATY<br/>
                        DATA ANGGOTA - MARIO FARREL W<br/>
                        </p>
                    </div>
                    {
                        session? (
                            <button className="bg-[#DC7C7C] w-full regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow"
                                onClick={POST}
                            >
                                <h1 className="text-[#F4F4F4] py-1 text-xl">AKHIRI SESI</h1>
                            </button>
                        ) : (
                            <button className="bg-[#E4E4E4] w-full regular custom-box-shadow">
                                <h1 className="py-1 text-xl">AKHIRI SESI</h1>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}