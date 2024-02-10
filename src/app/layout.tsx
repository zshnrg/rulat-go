import type { Metadata } from "next";
import "./globals.css";
import { Silkscreen } from '@next/font/google'

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "Rulat Go!",
  description: "Cek kondisi rulat dari mana saja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={silkscreen.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>{children}</body>
    </html>
  );
}
