"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MarqueeLights } from "@/components/ui/marquee-lights"

const navItems = [
  { href: "/random", label: "RANDOM" },
  { href: "/create", label: "CREATE" },
  { href: "/choose", label: "CHOOSE" },
]

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <div className="rounded-3xl border-2 border-gold/30 bg-surface/60 shadow-spotlight px-4 py-8 sm:px-8">
          <MarqueeLights count={12} className="mb-4" />
          <h1 className="font-marquee text-4xl sm:text-6xl leading-tight bg-gradient-to-r from-gold via-orange-400 to-secondary bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(255,200,51,0.35)]">
            The Bracket Game
          </h1>
          <MarqueeLights count={12} className="mt-4" />
        </div>

        <motion.div className="w-32 h-32 mx-auto relative animate-float">
          <Image
            src="/bracket.png"
            alt="Bracket"
            width={500}
            height={300}
            className="w-auto h-auto"
          />
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-medium text-muted">
          Debate the best or worst of anything in tournament format
        </h2>

        <div className="flex flex-col gap-4 max-w-xs mx-auto pt-4">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={item.href}
                className="h-14 flex items-center justify-center rounded-2xl border-2 border-white/15 bg-surface font-marquee text-lg tracking-wide hover:border-gold/50 hover:bg-gold/10 hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
