import Image from 'next/image';

interface HeaderProps {
    line1?: string;
    line2?: string;
}

export default function Header({ line1, line2 }: HeaderProps) {
    return (
        <nav className="fixed top-0 z-20 flex bg-[#F4F4F4] h-[70px] w-screen justify-center items-center">
            <div className="h-fit w-full pl-4">
                <h1 className="leading-none">{line1}</h1>
                <h2 className="leading-none">{line2}</h2>
            </div>
            <Image
                src="/assets/header.svg"
                alt="Header"
                width={137}
                height={38}
                priority
            />
        </nav>
    );
}