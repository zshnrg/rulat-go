import Image from "next/image";
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

<<<<<<< Updated upstream
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>
=======
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
>>>>>>> Stashed changes

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
<<<<<<< Updated upstream
    </main>
=======


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
>>>>>>> Stashed changes
  );
}
