
import React, { useState } from 'react';

import Header from "@/components/header";
import { getUserByNIM } from "@/services/user";
import { signIn } from '@/services/auth';
import { User } from "@/lib/databasetypes";

interface Kampus {
    kampus?: string;
    onSuccess?: () => void;
}

export function SearchUser({ kampus, onSuccess }: Kampus) {
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [dataLength, setDataLength] = useState(0);
    const [userData, setUserData] = useState<User>()


    function searchUser() {
        setIsButtonPressed(true);
        const nim = (document.getElementById('find') as HTMLInputElement).value;
        if (nim === '') {
            return;
        }
        async function GET() {
            const { data, error } = await getUserByNIM(nim);
            if (error) {
                console.error(error);
            }
            if (data) {
                setUserData(data[0]);
                setDataLength(data.length);
            }
        }
        GET();
    }

    const togglePasswordVisibility = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    async function POST(email: string, password: string) {
        if (email === '' || password === '') {
            return;
        }

        const { data, error } = await signIn({ email, password });
        if (error) {
            console.error(error.message);
            return;
        }
        if (data) {
            // Redirect to the next page
            onSuccess && onSuccess();
        }
    }

    const handleSelectedUser = () => {
        POST(userData?.nim_tpb + "@mail.com", userData?.nim_tpb!);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Lakukan logika pengiriman formulir atau validasi di sini
        POST(userData?.nim_tpb + "@mail.com", password);
    };


    return (
        <div>
            <Header line1="MEMBUKA RULAT" line2={`KAMPUS ${kampus}`} />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <form className="flex h-10">
                        <input
                            type="text"
                            id="find"
                            placeholder="Cari NIM"
                            className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                        />
                        <button className="flex w-12 h-10 bg-[#DEBD53] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow"
                            onClick={(e) => {
                                e.preventDefault();
                                searchUser();
                            }}
                        >
                            <img src="/icons/Proceed.svg" alt="search" />
                        </button>
                    </form>
                    <div className={`flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4 ${isButtonPressed ? "hidden" : ""}`}>
                        <p className="text-xs">
                            Untuk memastikan keamanan, masukan nim TPB/jurusan milikmu DAN PILIH IDENTITASMU
                            <br /><br />
                            proses ini hanya perlu dilakukan sekali saja. kami akan mengingatmu hingga sesi yang berakhir
                        </p>
                    </div>
                    <div className={`flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4 ${ dataLength === 0 && isButtonPressed ? "" : "hidden"}`}>
                        <p className="text-xs">
                        NIM TIDAK DITEMUKAN!<br/><br/>Pastikan nim yang dimasukkan benar dan terdaftar sebagai anggota KPA. <br/><br/>HUBUNGI KADIV MEDKOMINFO / MRT apabila terdapat kendala lebih lanjut.
                        </p>
                    </div>
                    {
                        userData ? (
                            <div className='flex flex-col bg-[#F4F4F4] dashed custom-box-shadow p-4'
                                onClick={userData.nama_lengkap === "Admin"? () => {} : handleSelectedUser }
                            >
                                <p>{userData.nama_lengkap}</p>
                                <p>{userData.nim_tpb} / {userData.nim_jurusan}</p>
                            </div>
                        ) : (
                            ""
                        )
                    }
                    {userData?.nama_lengkap === "Admin"? (
                        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                            <div className="relative flex h-10">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password admin"
                                    className="w-full p-2 bg-[#F4F4F4] dashed custom-box-shadow"
                                />
                                <button className="absolute right-0 flex w-12 h-10 bg-[#F4F4F4] regular custom-box-shadow items-center justify-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    <img src={showPassword? "/icons/Pass Revealed.svg" : "/icons/Pass Hidden.svg"} alt="show/hide" />
                                </button>
                            </div>
                            <button type="submit" className="w-full bg-[#8973AE] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                                <h1 className="text-[#F4F4F4] py-1 text-xl ">MASUK ADMIN</h1>
                            </button>
                        </form>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}