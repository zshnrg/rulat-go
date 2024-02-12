'use client';

import Header from "@/components/header";
import QRScanner from "@/components/qr_scanner";
import { redirect } from "next/navigation";

export default function Open({params}: {params: {kampus: string}}) {

    function onSuccessfulScan(decodedText: string, decodedResult: any) {
        console.log("QR Code found");
        const url = decodedText.split('/').pop();
        
        window.location.href = `/open/${url}`;
    }

    return (
        <div>
            <Header line1="MEMBUKA RULAT" line2={params.kampus === "g"? "KAMPUS GANESHA" : "KAMPUS JATINANGOR"} />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <QRScanner onSuccessfulScan={onSuccessfulScan}/>   
                    <div className="flex flex-col bg-[#F4F4F4] dashed custom-box-shadow justify-center items-center p-4">
                        <p className="text-xs">
                            SCAN QR CODE YANG TERDAPAT PADA DINDING RULAT UNTUK MELANJUTKAN
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}