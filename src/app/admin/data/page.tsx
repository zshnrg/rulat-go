import Header from "@/components/header";

export default function Data() {
    return (
        <div>
            <Header line1="Dashboard" line2="Ubah Data" />
            <div className="pt-[70px]">
                <div className="flex flex-col p-3  gap-3">
                    <form className="flex h-10">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Cari NIM"
                            className="w-full p-2 bg-[#F4F4F4] regular custom-box-shadow"
                        />
                        <button type="submit" className="flex w-12 h-10 bg-[#DEBD53] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow">
                            <img src="/icons/proceed.svg" alt="search" />
                        </button>
                    </form>

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
        </div>
    );
}