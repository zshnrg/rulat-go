'use client'

import Header from "@/components/header";
import { User } from "@/lib/databasetypes";
import { signOut, self } from "@/services/auth";
import Link from "next/link";
import { useEffect } from "react";

export default function Admin() {
    useEffect(() => {
        let user: User;
        async function getSession() {
            const { data: { session } } = await self();
            if (!session) {
                console.log("Tidak ada sesi");
                window.location.href = "/";
                return;
            } else {
                console.log(session);
                user = {
                    id: session.user?.id,
                    nim_tpb: session.user?.user_metadata.nim_tpb,
                    nim_jurusan: session.user?.user_metadata.nim_jurusan,
                    nama_lengkap: session.user?.user_metadata.nama_lengkap,
                    nama_panggilan: session.user?.user_metadata.nama_panggilan,
                    angkatan: session.user?.user_metadata.angkatan,
                    created_at: session.user?.created_at,
                };
            }
            if (user.nama_lengkap !== "Admin") {
                console.log("Tidak memiliki akses");
                window.location.href = "/";
                return;
            }
        }
        getSession();
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
            <Header line1="Dashboard" line2="Admin" />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <Link href="/admin/data">
                        <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                            <p>UBAH DATA ANGGOTA</p>
                            <p className="text-xs">Menghapus data anggota pada database</p>
                        </div>
                    </Link>
                    <Link href="/admin/upload">
                        <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                            <p>MASUKKAN DATA ANGGOTA</p>
                            <p className="text-xs">Menambahkan data anggota dengan menggunakan file csv</p>
                        </div>
                    </Link>
                    <Link href="/admin/settings">
                        <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                            <p>PERBARUI QR CODE</p>
                            <p className="text-xs">Memperbarui kode QR yang berlaku pada rulat</p>
                        </div>
                    </Link>
                    <Link href="/admin/account">
                        <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                            <p>PENGATURAN AKUN</p>
                        </div>
                    </Link>
                    <button className="bg-[#DC7C7C] mt-5 w-full regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow"
                        onClick={POST}
                    >
                        <h1 className="text-[#F4F4F4] py-1 text-xl">LOG OUT</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}