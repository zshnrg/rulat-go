'use client';

import Slider from "@/components/slide_to_proceed";
import Link from "next/link";
import { useState } from "react";

export default function Custom404() {
  
  
  return (
    <div className="flex flex-col gap-4 w-screen h-screen items-center justify-center">
      <h1>404 - Halaman tidak ditemukan</h1>
      <Link href="/" className="w-fit">
        <button className={`w-fit bg-[#DC7C7C] regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow`}>
          <h1 className="text-[#F4F4F4] py-1 px-4 text-xl ">Kembali</h1>
        </button>
      </Link>
    </div>
  );
}