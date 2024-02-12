'use client'

import { useState, useEffect } from "react";
import { self } from "@/services/auth";
import { getRulatStatus, updateRulatStatus, new_log } from "@/services/rulat";
import { SearchUser } from "@/components/search_user";
import { User, Rulat } from "@/lib/databasetypes";
import { useRouter } from "next/navigation";
import Slider from "@/components/slide_to_proceed";


export default function Open({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [text, setText] = useState('Mengakses...');
    const [dataUser, setUser] = useState<User | null>(null);
    const [dataRulat, setRulat] = useState<Rulat | null>(null);
    const [showSlider, setShowSlider] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

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
                router.push("/");
            }, 3000);
            return;
        }
        rulat = data[0];
        setRulat(rulat);
        setText(`${rulat.is_open ? "Menutup" : "Membuka"} rulat ${rulat.nama}...`);

        const { data: { session } } = await self();
        if (!session) {
            console.log("Tidak ada sesi");
            router.push("/member/" + rulat.nama.charAt(0).toLowerCase());
            return;
        } else {
            user = {
                id: session.user?.id,
                nim_tpb: session.user?.user_metadata.nim_tpb,
                nim_jurusan: session.user?.user_metadata.nim_jurusan,
                nama_lengkap: session.user?.user_metadata.nama_lengkap,
                nama_panggilan: session.user?.user_metadata.nama_panggilan,
                angkatan: session.user?.user_metadata.angkatan,
                created_at: session.user?.created_at,
            };
            setUser(user);
        }

        if (rulat.is_open) {
            setShowSlider(true);
            setText("Kamu akan menutup rulat!");
            return;
        }

        console.log("Mengubah status...");
        const { data: updateData, error: updateError } = await updateRulatStatus(rulat.id, !rulat.is_open);
        if (updateError) {
            console.error(updateError);
        } else {
            console.log("Status berhasil diubah");
            console.log(updateData);
            console.log("Mencatat log...");
            const { data: logData, error: logError } = await new_log(user.id, rulat.id, rulat.is_open ? "Tutup" : "Buka");
            if (logError) {
                console.error(logError);
            } else {
                setText(`Rulat ${rulat.nama} berhasil ${rulat.is_open ? "ditutup" : "dibuka"}`);
                // wait for 3 seconds before redirecting to the home page
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            }
        }
    }

    const handleSliderChange = (value: any) => {

        async function updateRulat() {
            if (dataUser && dataRulat) {
                const { data: updateData, error: updateError } = await updateRulatStatus(dataRulat.id, !dataRulat.is_open);
                if (updateError) {
                    console.error(updateError);
                } else {
                    console.log("Status berhasil diubah");
                    console.log(updateData);
                    console.log("Mencatat log...");
                    const { data: logData, error: logError } = await new_log(dataUser.id, dataRulat.id, dataRulat.is_open ? "Tutup" : "Buka");
                    if (logError) {
                        console.error(logError);
                    } else {
                        setText(`Rulat ${dataRulat.nama} berhasil ${dataRulat.is_open ? "ditutup" : "dibuka"}`);
                        // wait for 3 seconds before redirecting to the home page
                        setTimeout(() => {
                            router.push("/");
                        }, 3000);
                    }
                }
            }
        }

        setSliderValue(value);
        if (value === 100) {
            setShowSlider(false);
            setText("Mengubah status...");
            updateRulat();
        }
    };

    useEffect(() => {
        getRulat();
    }, []);

    return (
        <div>
            <div className="flex flex-col w-screen h-screen items-center justify-center text-center">
                <h1 className="px-4">{text}</h1>
                {showSlider && <div className="flex w-screen items-center justify-center">
                    <Slider onValueChange={handleSliderChange} />
                </div>}
            </div>
        </div>
    );
}