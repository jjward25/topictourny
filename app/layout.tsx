import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Import React
import { Inter, Poppins, Bungee } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
})

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
})

export const metadata: Metadata = {
  title: "The Bracket Game",
  description: "Debate the best or worst of anything in tournament format",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${bungee.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
