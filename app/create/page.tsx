"use client"

import dynamic from "next/dynamic"

// Dynamically import the Create component with no SSR
const CreateGame = dynamic(() => import("@/components/create-game"), {
  ssr: false,
})

export default function CreatePage() {
  return <CreateGame />
}

