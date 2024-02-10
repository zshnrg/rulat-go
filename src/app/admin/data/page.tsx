'use client'

import { useState, useEffect } from "react";
import Header from "@/components/header";
import { getAllUsers } from "@/services/user";
import { removeUser } from "@/services/admin";
import { self } from "@/services/auth";
import { User } from "@/lib/databasetypes";

export default function Data() {
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

    const [userData, setUserData] = useState<User[]>([])
    const [userFilter, setUserFilter] = useState<User[]>([])
    const [isRequested, setIsRequested] = useState(false)

    function filterData() {
        const search = (document.getElementById('find') as HTMLInputElement).value;
        if (search === '') {
            setUserFilter(userData);
            return;
        }
        const filteredData = userData.filter((user) => {
            return user.nim_tpb.toLowerCase().includes(search.toLowerCase()) || user.nim_jurusan?.toLowerCase().includes(search.toLowerCase()) || user.nama_lengkap?.toLowerCase().includes(search.toLowerCase());
        });
        setUserFilter(filteredData);
    }

    function deleteData(id: string, index: number) {
        async function DELETE() {
            const { data, error } = await removeUser(id);
            if (error) {
                console.log(error);
                
            } else {
                console.log(data);
                setUserFilter(userFilter.filter((_, i) => i !== index));
                // search for the index of the user in userData
                const userIndex = userData.findIndex((user) => user.id === id);
                // remove the user from userData
                setUserData(userData.filter((_, i) => i !== userIndex));
            }
        }

        DELETE();
    }
    

    useEffect(() => {
        async function GET() {
            if (!isRequested) {
                setIsRequested(true);
                const { data, error } = await getAllUsers();
                if (error) {
                    console.log(error);
                } else {
                    console.log("--------------------------------------------");
                    console.log(data);
                    setUserData(data!);
                    setUserFilter(data!);
                }
            }
        }

        GET();
    }, []);

    return (
        <div>
            <Header line1="Dashboard" line2="Ubah Data" />
            <div className="pt-[70px]">
                <div className="relative flex flex-col p-3  gap-3">
                    <form className="sticky top-[80px] flex h-10">
                        <input
                            type="text"
                            id="find"
                            placeholder="Cari NIM"
                            className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                        />
                        <button className="flex w-12 h-10 bg-[#DEBD53] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow"
                            onClick={(e) => {
                                e.preventDefault();
                                filterData();
                            }}
                        >
                            <img src="/icons/proceed.svg" alt="search" />
                        </button>
                    </form>

                    {
                        userFilter.map((item, index) => {
                            return (
                                item.nama_lengkap === null ? null :
                                <div key={index} className='flex bg-[#F4F4F4] dashed custom-box-shadow p-4'>
                                    <div className="w-full">
                                        <p>{item.nama_lengkap}</p>
                                        <p>{item.nim_tpb} / {item.nim_jurusan}</p>
                                    </div>
                                    <button className="flex w-12 h-10 bg-[#DC7C7C] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteData(item.id, index);
                                        }}
                                    >
                                        <img src="/icons/Trash.svg" alt="delete" color="#F4F4F4" />
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}