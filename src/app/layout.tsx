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
      <body className="flex flex-col h-dvh">
        <NavBar/>
        <main className="flex-1 min-h-0 overflow-y-auto scroll-touch">{children}</main>
        <MainFooter/>
      </body>
    </html>
  )
}