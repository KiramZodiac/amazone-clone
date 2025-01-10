
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";

import {Poppins} from 'next/font/google'
import { Metadata } from "next";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "Guula Wanno",
  description: "Kiram Zodiac",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <Header/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
