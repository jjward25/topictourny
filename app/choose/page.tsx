"use client"

import dynamic from "next/dynamic"

// Dynamically import the Choose component with no SSR
const ChooseGame = dynamic(() => import("@/components/choose-game"), {
  ssr: false,
})

export default function ChoosePage() {
  return <ChooseGame />
}

