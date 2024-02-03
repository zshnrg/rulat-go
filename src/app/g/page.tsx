'use client';

import Header from "@/components/header";

export default function Ganesha() {
    const openWhatsApp = () => {
        window.open('https://wa.me/', '_blank');
    };

    return (
        <div>
            <Header line1="MEMBUKA RULAT" line2="KAMPUS GANESHA" />
            <div className="flex flex-col p-3 gap-3">
                <div className="flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4">
                    <h1 className=" text-center">CARA MEMBUKA RULAT</h1>
                    <p className="text-xs text-center">
                    Kunjungi satpam yang berada di samping kantor direktorat mahasiswa gedung cc barat<br/><br/>Jadwal Satpam<br/>
                    </p>
                    <div className="flex flex-row w-fit gap-2">
                        <p className="text-xs text-right">
                            Senin -<br/>
                            Selasa -<br/>
                            Rabu -<br/>
                            Kamis -<br/>
                            Jumat -<br/>
                            Sabtu -<br/>
                            Minggu -<br/>
                        </p>
                        <p className="text-xs text-left">
                            XXX<br/>
                            XXX<br/>
                            XXX<br/>
                            XXX<br/>
                            XXX<br/>
                            XXX<br/>
                            XXX<br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}