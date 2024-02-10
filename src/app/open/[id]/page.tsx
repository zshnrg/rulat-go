'use client'

import { useState, useEffect } from "react";
import { self } from "@/services/auth";
import { getRulatStatus, updateRulatStatus, new_log } from "@/services/rulat";
import { SearchUser } from "@/components/search_user";
import { User, Rulat } from "@/lib/databasetypes";


export default function Open({ params }: { params: { id: string } }) {
    const [text, setText] = useState('Mengakses...');

    async function getRulat() {
        let rulat: Rulat;
        let user: User;

        console.log("Mengecek status...");
        const { data, error } = await getRulatStatus(params.id);

        if (error) {
            console.error(error);
            return;
        }
        if (!data || data.length === 0) {
            setText('Rulat tidak ditemukan');
            setText('Rulat tidak ditemukan');
            // wait for 3 seconds before redirecting to the home page
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
            return;
        }
        rulat = data[0];
        setText(`${rulat.is_open ? "Menutup" : "Membuka"} rulat ${rulat.nama}...`);

        console.log("Data:", rulat);


        const { data: { session } } = await self();
        if (!session) {
            console.log("Tidak ada sesi");
            window.location.href = "/member/" + rulat.nama.charAt(0).toLowerCase();
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

        console.log("Mengubah status...");
        const { data: updateData, error: updateError } = await updateRulatStatus(rulat.id, !rulat.is_open);
        if (updateError) {
            console.error(updateError);
        } else {
            console.log("Status berhasil diubah");
            console.log(updateData);
            console.log("Mencatat log...");
            console.log("Data: " + user.id + " " + rulat.id + " " + (rulat.is_open ? "Tutup" : "Buka"));
            const { data: logData, error: logError } = await new_log(user.id, rulat.id, rulat.is_open ? "Tutup" : "Buka");
            if (logError) {
                console.error(logError);
            } else {
                console.log(logData);
                setText(`Rulat ${rulat.nama} berhasil ${rulat.is_open ? "ditutup" : "dibuka"}`);
                // wait for 3 seconds before redirecting to the home page
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
        }
    }

    useEffect(() => {
        getRulat();
    }, []);

    return (
        <div>
            <div className="flex w-screen h-screen items-center justify-center">
                <h1>{text}</h1>
            </div>
        </div>
    );
}