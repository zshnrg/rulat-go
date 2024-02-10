import Header from "@/components/header";
import QRScanner from "@/components/qr_scanner";

export default function Open() {
    return (
        <div>
            <Header line1="MEMBUKA RULAT" line2="KAMPUS GANESHA" />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3 gap-3">
                    <QRScanner />   
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