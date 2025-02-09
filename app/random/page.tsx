"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the Random component with no SSR
const RandomGame = dynamic(() => import("@/components/random-game"), {
  ssr: false,
})

export default function RandomPage() {
  // Initialize localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("remainingGames")) {
        localStorage.setItem("remainingGames", JSON.stringify([]))
      }
    }
  }, [])

  return <RandomGame />
}

