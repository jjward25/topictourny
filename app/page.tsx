"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const randomColors = ["text-blue-500", "text-green-600", "text-yellow-600"]
  const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold mb-8 text-green-600">
          The Bracket Game
        </h1>

        <div className="w-32 h-32 mx-auto relative mb-8">
          <Image
            src="/bracket.png"
            alt="Bracket"
            width={500}
            height={300}
            className="w-auto h-auto"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-300 mb-12">
          Debate the best or worst of anything in tournament format
        </h2>

        <div className="flex flex-col gap-6 max-w-xs mx-auto">
          <Link
            href="/random"
            className="h-14 flex items-center justify-center rounded-md border border-white/20 text-lg hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            RANDOM
          </Link>

          <Link
            href="/create"
            className="h-14 flex items-center justify-center rounded-md border border-white/20 text-lg hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            CREATE
          </Link>

          <Link
            href="/choose"
            className="h-14 flex items-center justify-center rounded-md border border-white/20 text-lg hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            CHOOSE
          </Link>
        </div>
      </div>
    </main>
  )
}

