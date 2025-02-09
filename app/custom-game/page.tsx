"use client"

import { useEffect, useState } from "react"
import RandomGame from "@/components/random-game"

export default function CustomGamePage() {
  const [customGame, setCustomGame] = useState<{ category: string; nominees: string[] } | null>(null)

  useEffect(() => {
    const storedGame = localStorage.getItem("customGame")
    if (storedGame) {
      const parsedGame = JSON.parse(storedGame)
      const category = Object.keys(parsedGame)[0]
      const nominees = parsedGame[category]
      setCustomGame({ category, nominees })
    }
  }, [])

  if (!customGame) return null

  return <RandomGame initialGame={customGame} />
}

