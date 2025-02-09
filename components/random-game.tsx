"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { games } from "@/data/bracket_list"

type Matchup = [string, string]
type GameCategory = {
  [key: string]: string[]
}

const defaultSeeds = ["1", "8", "4", "5", "2", "7", "3", "6"]

interface RandomGameProps {
  initialGame?: {
    category: string
    nominees: string[]
    seeds?: string[]
  }
}

export default function RandomGame({ initialGame }: RandomGameProps) {
  const [game, setGame] = useState<{ category: string; nominees: string[]; seeds: string[] } | null>(null)
  const [winners, setWinners] = useState<string[]>(["", "", "", ""])
  const [winnerSeeds, setWinnerSeeds] = useState<string[]>(["", "", "", ""])
  const [winnersTwo, setWinnersTwo] = useState<string[]>(["", ""])
  const [winnerSeedsTwo, setWinnerSeedsTwo] = useState<string[]>(["", ""])
  const [winnersThree, setWinnersThree] = useState<string[]>([""])

  const selectRandomGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * games.length)
    const randomGame = games[randomIndex] as unknown as GameCategory
    const category = Object.keys(randomGame)[0]
    const nominees = randomGame[category]
    const shuffledNominees = shuffleArray([...nominees])
    const randomizedSeeds = shuffleArray([...defaultSeeds])
    setGame({ category, nominees: shuffledNominees, seeds: randomizedSeeds })
    resetGameState()
  }, [])

  useEffect(() => {
    if (initialGame) {
      setGame({
        ...initialGame,
        seeds: initialGame.seeds || defaultSeeds,
      })
    } else {
      selectRandomGame()
    }
  }, [initialGame, selectRandomGame])

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const resetGameState = () => {
    setWinners(["", "", "", ""])
    setWinnerSeeds(["", "", "", ""])
    setWinnersTwo(["", ""])
    setWinnerSeedsTwo(["", ""])
    setWinnersThree([""])
  }

  const handleWinnerSelection = (nominee: string, round: number, matchup: number, seed: string) => {
    if (round === 1) {
      const newWinners = [...winners]
      newWinners[matchup] = nominee
      const newSeeds = [...winnerSeeds]
      newSeeds[matchup] = seed
      setWinners(newWinners)
      setWinnerSeeds(newSeeds)
    } else if (round === 2) {
      const newWinners = [...winnersTwo]
      newWinners[matchup] = nominee
      const newSeeds = [...winnerSeedsTwo]
      newSeeds[matchup] = seed
      setWinnersTwo(newWinners)
      setWinnerSeedsTwo(newSeeds)
    } else if (round === 3) {
      setWinnersThree([nominee])
      // Game over logic
      alert(`The winner is: ${nominee}`)
      selectRandomGame()
    }
  }

  if (!game) return null

  const roundOneComplete = winners.every(Boolean)
  const roundTwoComplete = winnersTwo.every(Boolean)

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-500 hover:text-blue-400">
            The Bracket Game
          </Link>
          <Image src="/bracket.png" width={128} height={128} className="mx-auto my-4" alt="logo" />
          <h2 className="text-2xl font-semibold mb-2">{game.category}</h2>
          <p className="text-lg mb-4">Debate the best, or the worst...</p>
          <button
            onClick={selectRandomGame}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Next Game
          </button>
        </div>

        <div className="flex justify-between">
          {/* Round 1 */}
          <div className="w-1/3">
            {[0, 1, 2, 3].map((matchup) => (
              <div key={matchup} className="mb-4 border border-blue-500 p-2">
                {[0, 1].map((index) => {
                  const nominee = game.nominees[matchup * 2 + index]
                  const seed = game.seeds[matchup * 2 + index]
                  const isWinner = winners[matchup] === nominee
                  return (
                    <div
                      key={index}
                      onClick={() => handleWinnerSelection(nominee, 1, matchup, seed)}
                      className={`flex cursor-pointer ${isWinner ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                    >
                      <div className="w-8 bg-blue-500 text-white text-right pr-1">{seed}</div>
                      <div className="flex-grow pl-2">{nominee}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Round 2 */}
          <div className={`w-1/3 ${roundOneComplete ? "block" : "hidden"}`}>
            {[0, 1].map((matchup) => (
              <div key={matchup} className="mb-4 border border-purple-500 p-2">
                {[0, 1].map((index) => {
                  const nominee = winners[matchup * 2 + index]
                  const seed = winnerSeeds[matchup * 2 + index]
                  const isWinner = winnersTwo[matchup] === nominee
                  return (
                    <div
                      key={index}
                      onClick={() => handleWinnerSelection(nominee, 2, matchup, seed)}
                      className={`flex cursor-pointer ${isWinner ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"}`}
                    >
                      <div className="w-8 bg-purple-500 text-white text-right pr-1">{seed}</div>
                      <div className="flex-grow pl-2">{nominee}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Final Round */}
          <div className={`w-1/3 ${roundTwoComplete ? "block" : "hidden"}`}>
            <div className="mb-4 border border-green-500 p-2">
              {[0, 1].map((index) => {
                const nominee = winnersTwo[index]
                const seed = winnerSeedsTwo[index]
                const isWinner = winnersThree[0] === nominee
                return (
                  <div
                    key={index}
                    onClick={() => handleWinnerSelection(nominee, 3, 0, seed)}
                    className={`flex cursor-pointer ${isWinner ? "bg-green-500 text-white" : "hover:bg-green-500 hover:text-white"}`}
                  >
                    <div className="w-8 bg-green-500 text-white text-right pr-1">{seed}</div>
                    <div className="flex-grow pl-2">{nominee}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

