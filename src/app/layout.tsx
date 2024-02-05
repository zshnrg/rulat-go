import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< Updated upstream
    <html lang="en">
      <body className={inter.className}>{children}</body>
=======
    <html lang="en" className={silkscreen.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>{children}</body>
>>>>>>> Stashed changes
    </html>
  );
}
