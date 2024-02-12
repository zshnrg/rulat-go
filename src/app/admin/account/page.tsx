'use client';

import Header from "@/components/header"
import Toast from "@/components/toast";
import { updatePassword, self } from "@/services/auth";
import { useState, useEffect } from "react"
import { User } from "@/lib/databasetypes";
import { useRouter } from "next/navigation";


export default function Account() {
    const router = useRouter();
    useEffect(() => {
        let user: User;
        async function getSession() {
            const { data: { session } } = await self();
            if (!session) {
                console.log("Tidak ada sesi");
                router.push("/");
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
            }
            if (user.nama_lengkap !== "Admin") {
                console.log("Tidak memiliki akses");
                router.push("/");
                return;
            }
        }
        getSession();
    }, []);
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showToast, setShowToast] = useState(false)

    const togglePasswordVisibility = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // check if password and repeat-password are the same
        // if not the same, show an error message

        if (password !== repeatedPassword) {
            setErrorMessage('Password tidak sama');
            setShowError(true);
            return;
        }
        
        // if password less than 8 characters, show an error message
        if (password.length < 8) {
            setErrorMessage('Password minimal 8 karakter');
            setShowError(true);
            return;
        }

        // if password is the same as repeated password, show a success message
        console.log('Password submitted:', password);

        async function update(password: string) {
            const { data, error } = await updatePassword(password);
            if (error) {
                setErrorMessage(error.message);
                setShowError(true);
            } else {
                setShowToast(true);
            }
        }

        update(password);
    };

    const handleToast = () => {
        setShowToast(false);
    };

    return (
        <div>
            <Header line1="Pengaturan" line2="Akun" />
            <div className="pt-[70px]">

                <div className="flex flex-col p-3 gap-3">
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className="relative flex h-10">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password baru"
                                className="w-full p-2 bg-[#F4F4F4] dashed custom-box-shadow"
                            />
                            <button className="absolute right-0 flex w-12 h-10 bg-[#F4F4F4] regular custom-box-shadow items-center justify-center"
                                onClick={togglePasswordVisibility}
                            >
                                <img src={showPassword ? "/icons/Pass Revealed.svg" : "/icons/Pass Hidden.svg"} alt="show/hide" />
                            </button>
                        </div>
                        <input
                            id="repeat-password"
                            type="password"
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            placeholder="Ulangi password baru"
                            className="w-full p-2 bg-[#F4F4F4] dashed custom-box-shadow hide-passsword"
                        />
                        <p className={`w-full p-2 bg-[#DC7C7C] text-[#F4F4F4] dashed custom-box-shadow ${ showError? "" : "hidden"}`}>{errorMessage}</p>
                        <button onClick={handleSubmit}
                                className="w-full bg-[#8973AE] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                            <h1 className="text-[#F4F4F4] py-1 text-xl ">UBAH PASSWORD</h1>
                        </button>
                    </form>
                </div>
            </div>
            <Toast text="Password berhasil diubah" isVisible={showToast} time={3000} onClose={handleToast}/>
        </div>
    )
}