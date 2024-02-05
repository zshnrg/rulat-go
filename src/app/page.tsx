'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const data = [
  {
    nama_ruang_latihan: "GANESHA",
    is_open: true,
    logs: [
      {
        date: "2021-10-10",
        time: "10:00",
        act: "Buka",
        person: {
          name: "John",
          nim_tpb: "1234567890",
          nim_jurusan: "1234567890",
          angkatan: "2021",
        },
      },
      {
        date: "2021-10-11",
        time: "11:00",
        act: "Tutup",
        person: {
          name: "Satpam",
          nim_tpb: "0987654321",
          nim_jurusan: "1234567890",
          angkatan: "2022",
        },
      },
      {
        date: "2021-10-12",
        time: "12:00",
        act: "Buka",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      },
      {
        date: "2021-10-13",
        time: "13:00",
        act: "Tutup",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      },
      {
        date: "2021-10-14",
        time: "14:00",
        act: "Buka",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      }
    ],
  },
  {
    nama_ruang_latihan: "JATINANGOR",
    is_open: false,
    logs: [
      {
        date: "2021-10-10",
        time: "10:00",
        act: "Tutup",
        person: {
          name: "John",
          nim_tpb: "1234567890",
          nim_jurusan: "1234567890",
          angkatan: "2021",
        },
      },
      {
        date: "2021-10-11",
        time: "11:00",
        act: "Buka",
        person: {
          name: "Jane",
          nim_tpb: "0987654321",
          nim_jurusan: "1234567890",
          angkatan: "2022",
        },
      },
      {
        date: "2021-10-12",
        time: "12:00",
        act: "Tutup",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      },
      {
        date: "2021-10-13",
        time: "13:00",
        act: "Buka",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      },
      {
        date: "2021-10-14",
        time: "14:00",
        act: "Tutup",
        person: {
          name: "Doe",
          nim_tpb: "1357924680",
          nim_jurusan: "1234567890",
          angkatan: "2023",
        },
      }
    ],
  },
];

export default function Home() {


  const [isChecked, setIsChecked] = useState(false);
  const [labelText, setLabelText] = useState('GANESHA');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setLabelText(isChecked ? 'GANESHA' : 'JATINANGOR');
  };

  return (
    <div className="w-screen h-[calc(100dvh)] bg-[#4B3F5F]">
      <div className="h-3/5">

        {/* Header toggle switch */}
        <div className="flex w-full p-3 gap-3 justify-center">
          <Link href="/about">
            <button className="flex w-10 h-10 bg-[#F4F4F4] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow">
              <Image
                src="/icons/Author.svg"
                alt="Arrow"
                width={20}
                height={20}
              />
            </button>
          </Link>
          <label className="flex items-center relative w-[230px] cursor-pointer select-none custom-box-shadow text-sm">
            <input
              type="checkbox"
              className="appearance-none cursor-pointer w-full h-10 bg-[#3C324C] regular"
              onChange={handleCheckboxChange}
            />
            <span className="absolute uppercase left-4 text-[#F4F4F4]"> GANESHA </span>
            <span className="absolute uppercase right-4 text-[#F4F4F4]"> JATINANGOR </span>
            <span
              className={`flex w-fit h-8 left-1 px-3 absolute transform transition-transform items-center justify-center bg-[#F4F4F4] ${isChecked ? 'translate-x-[96px]' : 'translate-x-0'
                }`}
            >
              {labelText}
            </span>
          </label>
          <Link href="/help">
            <button className="flex w-10 h-10 bg-[#F4F4F4] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow">
              <Image
                src="/icons/Question.svg"
                alt="Arrow"
                width={20}
                height={20}
              />
            </button>
          </Link>
        </div>

        {/* Image illustration */}
        <div className="flex h-100">
          <Image
            src={(isChecked && data[1].is_open) || (!isChecked && data[0].is_open) ? "/assets/Buka.png" : "/assets/Tutup.png"}
            alt="Rulat Buka Yeyy!"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
            unoptimized
            priority

          />
        </div>
      </div>


      {/* Main content */}
      <div className="flex flex-col h-2/5 w-full">

        <div className="relative flex h-[70px] items-center justify-end bg-[#F4F4F4] py-4">
          <Image
          className="absolute -top-2 left-6 -rotate-6"
            src={(isChecked && data[1].is_open) || (!isChecked && data[0].is_open) ? "/assets/Open Sign.png" : "/assets/Closed Sign.png"}
            alt="Header"
            width={137}
            height={38}
            unoptimized
            priority
          />
          <Image
            src="/assets/header.svg"
            alt="Header"
            width={137}
            height={38}
          />
        </div>

        <div className="flex flex-col h-full p-3 gap-3 bg-[#E3E3E3] overflow-scroll">
          {data[isChecked ? 1 : 0].logs.map((log, index) => (
            <div key={index} className="flex leading-none text-sm gap-3">
              <div className="flex flex-col w-1/3">
                <p>{log.date}</p>
                <div className="flex gap-1">
                  <Image src="/icons/Clock.svg" alt="Time" width={10} height={10} />
                  <p className="text-[#8973AE]">{log.time}</p>
                </div>
              </div>
              <div className="vl"/>
              <p className="w-2/3">Di{log.act} oleh {log.person.name} {log.person.name != "Satpam"? `KPA${log.person.angkatan.slice(-2)}` : ""}</p>
            </div>
          ))}
        </div>

        <div className="flex h-[70px] p-3 bg-[#F4F4F4]">
          <Link href="/member" className="w-full">
            <button className={`w-full bg-[${(isChecked && data[1].is_open) || (!isChecked && data[0].is_open) ? "#DC7C7C" : "#8973AE"}] regular custom-box-shadow hover:translate-y-1 hover:no-box-shadow`}>
              <h1 className="text-[#F4F4F4] py-1 text-xl ">{(isChecked && data[1].is_open) || (!isChecked && data[0].is_open) ? "TUTUP" : "BUKA"} RUANG LATIHAN</h1>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
