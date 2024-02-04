import Header from "@/components/header";
import Link from "next/link";

export default function Admin() {
    return (
        <div>
            <Header line1="Dashboard" line2="Admin" />
            <div className="flex flex-col p-3 gap-3"> 
                <Link href="/admin/data">
                    <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                        <p>UBAH DATA ANGGOTA</p>
                        <p className="text-xs">Menghapus data anggota pada database</p>
                    </div>
                </Link>
                <Link href="/admin/upload">
                    <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                        <p>MASUKKAN DATA ANGGOTA</p>
                        <p className="text-xs">Menambahkan data anggota dengan menggunakan file csv</p>
                    </div>
                </Link>
                <Link href="/admin/settings">
                    <div className='flex flex-col bg-[#F4F4F4] regular custom-box-shadow p-4 hover:translate-y-1 hover:no-box-shadow'>
                        <p>PERBARUI QR CODE</p>
                        <p className="text-xs">Memperbarui kode QR yang berlaku pada rulat</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}