import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import MainFooter from "./components/MainFooter";
import localFont from "next/font/local"

const overwatchFont = localFont({
  src:"../../public/fonts/big_noodle_titling_oblique.ttf"
})

const overwatchMainFont = localFont({
  src:"../../public/fonts/BankSansEFCYBold.otf"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        <main className="h-full">{children}</main>
        <MainFooter/>
      </body>
    </html>
  )
}