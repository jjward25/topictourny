"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-500 hover:text-blue-400">
            The Bracket Game
          </Link>
          <Image src="/bracket.png" width={128} height={128} className="mx-auto my-4" alt="logo" />
          <h2 className="text-2xl font-semibold mb-2">Choose a Game</h2>
        </div>

        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <ul className="space-y-2">
          {filteredGames.map((game, index) => {
            const category = Object.keys(game)[0]
            return (
              <li
                key={index}
                onClick={() => startGame(category)}
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-md p-3 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {category}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

