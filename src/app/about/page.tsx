'use client';

import Header from "@/components/header";
import Link from "next/link";

export default function About() {

    return (
        <div>
            <Header line1="Tentang" line2="Kami"/>
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
                <Link href="/logout" className="w-full">
                    <button className="bg-[#DC7C7C] w-full regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow">
                        <h1 className="text-[#F4F4F4] py-1 text-xl">AKHIRI SESI</h1>
                    </button>
                </Link>
            </div>
        </div>
    );
}