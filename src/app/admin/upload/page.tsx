import Header from "@/components/header";

export default function Upload() {
     return (
         <div>
             <Header line1="Dashboard" line2="Masukkan Data" />
            <div className="flex flex-col p-3 gap-3">
                <button className="w-full bg-[#8973AE] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                    <h1 className="text-[#F4F4F4] py-1 text-xl ">UPLOAD</h1>
                </button>
                <button className="w-full bg-[#8973AE] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                    <h1 className="text-[#F4F4F4] py-1 text-xl ">SIMPAN</h1>
                </button>
                <button className="w-full bg-[#F4F4F4] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                    <h1 className="text-[#313131] py-1 text-xl ">CONTOH CSV</h1>
                </button>

                <div className='flex bg-[#F4F4F4] dashed custom-box-shadow p-4'>
                    <div className="w-full">
                        <p>Rozan Ghosani</p>
                        <p>18221121 / 16521411</p>
                    </div>
                    <button className="flex w-12 h-10 bg-[#DC7C7C] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow">
                        <img src="/icons/Trash.svg" alt="delete" color="#F4F4F4"/>
                    </button>
                </div>
            </div>
         </div>
     );
 }