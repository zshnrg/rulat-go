'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react';

import Header from "@/components/header";

export default function Ganesha() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const searchParams = useSearchParams()

    const search = searchParams.get('search')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan logika pengiriman formulir atau validasi di sini
        console.log('Password submitted:', password);
    };

    return (
        <div>
            <Header line1="MEMBUKA RULAT" line2="KAMPUS GANESHA" />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <form className="flex h-10">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            defaultValue={search ? search : ""}
                            placeholder="Cari NIM"
                            className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                        />
                        <button type="submit" className="flex w-12 h-10 bg-[#DEBD53] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow">
                            <img src="/icons/proceed.svg" alt="search" />
                        </button>
                    </form>
                    <div className={`flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4 ${search ? "hidden" : ""}`}>
                        <p className="text-xs">
                            Untuk memastikan keamanan, masukan nim TPB/jurusan milikmu DAN PILIH IDENTITASMU
                            <br /><br />
                            proses ini hanya perlu dilakukan sekali saja. kami akan mengingatmu hingga sesi yang berakhir
                        </p>
                    </div>
                    <div className={`flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4 ${search ? "hidden" : ""}`}>
                        <p className="text-xs">
                        NIM TIDAK DITEMUKAN!<br/><br/>Pastikan nim yang dimasukkan benar dan terdaftar sebagai anggota KPA. <br/><br/>HUBUNGI KADIV MEDKOMINFO / MRT apabila terdapat kendala lebih lanjut.
                        </p>
                    </div>
                    <div className='flex flex-col bg-[#F4F4F4] dashed custom-box-shadow p-4'>
                        <p>Rozan Ghosani</p>
                        <p>18221121 / 16521411</p>
                    </div>
                    {search && search === "00000000"? (
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