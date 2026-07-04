"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { games } from "@/data/bracket_list"

export default function ChooseGame() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGames = games.filter((game) => Object.keys(game)[0].toLowerCase().includes(searchTerm.toLowerCase()))

  const startGame = (category: string) => {
    const selectedGame = games.find((game) => Object.keys(game)[0] === category)
    if (selectedGame) {
      localStorage.setItem("selectedGame", JSON.stringify(selectedGame))
      router.push("/selected-game")
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="font-marquee text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-orange-400 to-secondary">
            The Bracket Game
          </Link>
          <Image src="/bracket.png" width={128} height={128} className="mx-auto my-4" alt="logo" />
          <h2 className="font-display text-2xl font-semibold mb-2 text-gold">Choose a Game</h2>
        </div>

        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 mb-6 bg-surface border border-white/10 rounded-xl text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition-colors"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredGames.map((game, index) => {
            const category = Object.keys(game)[0]
            const accents = ["border-l-accent1", "border-l-accent2", "border-l-accent3"]
            return (
              <motion.li
                key={index}
                onClick={() => startGame(category)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-surface hover:bg-white/5 cursor-pointer rounded-xl p-4 border border-white/10 border-l-4 ${accents[index % 3]} font-medium shadow-card transition-colors`}
              >
                {category}
              </motion.li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
