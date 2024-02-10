'use client';

import Header from "@/components/header";
import React, { useEffect, useRef, useState } from 'react';
import { useQRCode } from "next-qrcode";
import html2canvas from "html2canvas";

import { User } from "@/lib/databasetypes";
import { self } from "@/services/auth";
import { getAllRulat, updateRulatQRCode } from "@/services/rulat";
import Toast from "@/components/toast";

const domain = window.location.origin + "/open/";

const data = {
    'ganesha': '',
    'jatinangor': ''
}

function generateRandomKey(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters.charAt(randomIndex);
    }
    return key;
}

export default function Settigs() {
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

    const [isChecked, setIsChecked] = useState(false);
    const [labelText, setLabelText] = useState("ganesha");
    const [divWidth, setDivWidth] = useState(250);
    const [ganeshaCode, setGaneshaCode] = useState(data['ganesha']);
    const [jatinangorCode, setJatinangorCode] = useState(data['jatinangor']);
    const [showToast, setShowToast] = useState(false)

    const qrCodeRef = useRef(null);

    const { SVG } = useQRCode()

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setLabelText(isChecked ? 'ganesha' : 'jatinangor');
    };

    const handleToast = () => {
        setShowToast(false);
    };

    async function POST() {
        console.log(`Changing QR code for ${isChecked ? "jatinangor" : "ganesha"} to ${isChecked ? jatinangorCode : ganeshaCode}`);
        const { data, error } = await updateRulatQRCode(isChecked ? 'jatinangor' : 'ganesha', isChecked ? jatinangorCode : ganeshaCode);
        if (error) {
            console.error(error.message);
            return;
        } else {
            console.log(data);
            setShowToast(true);
        }
    }


    useEffect(() => {

        // getting rulat qr code
        async function getRulat() {
            const { data, error } = await getAllRulat();
            if (error) {
                console.error(error);
                return;
            }
            if (data) {
                console.log(data);
                const ganesha_index = data.findIndex((rulat) => rulat.nama === "ganesha");
                const jatinangor_index = data.findIndex((rulat) => rulat.nama === "jatinangor");
                setGaneshaCode(data[ganesha_index].qr_code);
                setJatinangorCode(data[jatinangor_index].qr_code);
            }
        }

        getRulat();
    }, []);


    const downloadImage = async () => {
        if (qrCodeRef.current) {
            await setDivWidth(1000);
            const canvas = await html2canvas(qrCodeRef.current);
            await setDivWidth(250);
            const dataUrl = canvas.toDataURL();
            
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'qrcode.png'; // Specify the download filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };



    return (
        <div>
            <Header line1="Dashboard" line2="Perbarui QR" />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3 items-center">
                    <div className="flex aspect-square w-fit bg-[#F4F4F4] p-3">
                        <div ref={qrCodeRef}>
                            <SVG
                                text={isChecked ? domain + jatinangorCode : domain + ganeshaCode}
                                options={{
                                    margin: 2,
                                    width: divWidth,
                                    color: {
                                        dark: '#000000',
                                        light: '#F4F4F4',
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <label className="flex items-center relative w-[230px] cursor-pointer select-none custom-box-shadow text-sm">
                        <input
                            type="checkbox"
                            className="appearance-none cursor-pointer w-full h-10 bg-[#B6B6B6] regular"
                            onChange={handleCheckboxChange}
                        />
                        <span className="absolute uppercase left-4 text-[#F4F4F4]"> ganesha </span>
                        <span className="absolute uppercase right-4 text-[#F4F4F4]"> jatinangor </span>
                        <span
                            className={`flex w-fit h-8 left-1 px-3 absolute transform transition-transform items-center justify-center bg-[#F4F4F4] ${isChecked ? 'translate-x-[96px]' : 'translate-x-0'
                                }`}
                        >
                            {labelText}
                        </span>
                    </label>

                    <div className="flex">
                        <p className="flex text-sm bg-[#DEBD53] p-1 regular custom-box-shadow items-center">open/</p>
                        {isChecked ? (
                            <input
                                type="text"
                                name="code"
                                defaultValue={jatinangorCode}
                                placeholder="Masukan kode baru"
                                className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                            />
                        ) : (
                            <input
                                type="text"
                                name="code"
                                defaultValue={ganeshaCode}
                                placeholder="Masukan kode baru"
                                className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                            />
                        )}
                    </div>
                    <div className="flex gap-3 w-full">
                        <button className="w-full bg-[#F4F4F4] regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow"
                            onClick={() => {
                                if (isChecked) {
                                    setJatinangorCode(generateRandomKey(16));
                                } else {
                                    setGaneshaCode(generateRandomKey(16));
                                }
                            }}
                        >
                            <h1 className="text-[#313131] py-1 text-xl ">Acak</h1>
                        </button>
                        <button className="w-full bg-[#F4F4F4] regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow"
                            onClick={downloadImage}
                        >
                            <h1 className="text-[#313131] py-1 text-xl ">Unduh</h1>
                        </button>
                    </div>
                    <button className="w-full bg-[#8973AE] regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow"
                        onClick={POST}
                    >
                        <h1 className="text-[#F4F4F4] py-1 text-xl ">Simpan</h1>
                    </button>
                </div>
            </div>
            <Toast text={`Berhasil mengubah QR ${isChecked? "Jatinangor" : "Ganesha"}`} isVisible={showToast} time={3000} onClose={handleToast} />
        </div>
    );
}