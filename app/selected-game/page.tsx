"use client"

import { useEffect, useState } from "react"
import RandomGame from "@/components/random-game"

export default function SelectedGamePage() {
  const [selectedGame, setSelectedGame] = useState<{ category: string; nominees: string[] } | null>(null)

  useEffect(() => {
    const storedGame = localStorage.getItem("selectedGame")
    if (storedGame) {
      const parsedGame = JSON.parse(storedGame)
      const category = Object.keys(parsedGame)[0]
      const nominees = parsedGame[category]
      setSelectedGame({ category, nominees })
    }
  }, [])

  if (!selectedGame) return null

  return <RandomGame initialGame={selectedGame} />
}

