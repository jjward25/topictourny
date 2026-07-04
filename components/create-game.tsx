"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const inputClasses =
  "mt-1 block w-full px-4 py-2.5 bg-surface border border-white/10 rounded-xl text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition-colors"

export default function CreateGame() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [seeds, setSeeds] = useState(Array(8).fill(""))

  const handleSeedChange = (index: number, value: string) => {
    const newSeeds = [...seeds]
    newSeeds[index] = value
    setSeeds(newSeeds)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && seeds.every((seed) => seed.trim() !== "")) {
      const game = { [title]: seeds }
      localStorage.setItem("customGame", JSON.stringify(game))
      router.push("/custom-game")
    } else {
      alert("Please fill in all fields")
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
          <h2 className="font-display text-2xl font-semibold mb-2 text-gold">Create Your Own Game</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-muted">
              Game Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {seeds.map((seed, index) => (
              <div key={index}>
                <label htmlFor={`seed-${index + 1}`} className="block text-sm font-medium text-muted">
                  Seed {index + 1}
                </label>
                <input
                  type="text"
                  id={`seed-${index + 1}`}
                  value={seed}
                  onChange={(e) => handleSeedChange(index, e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Start Game
          </Button>
        </form>
      </div>
    </div>
  )
}
