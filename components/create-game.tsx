"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-500 hover:text-blue-400">
            The Bracket Game
          </Link>
          <Image src="/bracket.png" width={128} height={128} className="mx-auto my-4" alt="logo" />
          <h2 className="text-2xl font-semibold mb-2">Create Your Own Game</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Game Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {seeds.map((seed, index) => (
            <div key={index}>
              <label htmlFor={`seed-${index + 1}`} className="block text-sm font-medium text-gray-300">
                Seed {index + 1}
              </label>
              <input
                type="text"
                id={`seed-${index + 1}`}
                value={seed}
                onChange={(e) => handleSeedChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Start Game
          </button>
        </form>
      </div>
    </div>
  )
}

