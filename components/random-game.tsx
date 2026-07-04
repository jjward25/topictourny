"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { games } from "@/data/bracket_list"
import { MatchupCard, BracketPlaceholder } from "@/components/ui/matchup-card"
import { BracketConnector } from "@/components/ui/bracket-connector"
import { Button } from "@/components/ui/button"
import { MarqueeLights } from "@/components/ui/marquee-lights"
import ReactConfetti from "react-confetti"

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
  const [showConfetti, setShowConfetti] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

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
      setWinner(nominee)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setWinner(null)
        selectRandomGame()
      }, 5000) // Reset after 5 seconds
    }
  }

  if (!game) return null

  const roundOneComplete = winners.every(Boolean)
  const roundTwoComplete = winnersTwo.every(Boolean)

  return (
    <div className="min-h-screen p-4">
      {showConfetti && <ReactConfetti />}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="font-marquee text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-orange-400 to-secondary">
            The Bracket Game
          </Link>
          <Image src="/bracket.png" width={128} height={128} className="mx-auto my-4" alt="logo" />
          <h2 className="font-display text-2xl font-semibold mb-2 text-gold">{game.category}</h2>
          <p className="text-lg text-muted mb-4">Debate the best, or the worst...</p>
          <Button onClick={selectRandomGame}>Next Game</Button>
        </div>

        {/* Desktop: full bracket tree with connector lines */}
        <div className="hidden md:grid grid-cols-[1fr_48px_1fr_48px_1fr] h-[520px]">
          <div className="h-full flex flex-col justify-around">
            {[0, 1, 2, 3].flatMap((matchup) =>
              [0, 1].map((index) => {
                const nominee = game.nominees[matchup * 2 + index]
                const seed = game.seeds[matchup * 2 + index]
                const isWinner = winners[matchup] === nominee
                return (
                  <MatchupCard
                    key={`${matchup}-${index}`}
                    nominee={nominee}
                    seed={seed}
                    accent="accent1"
                    isWinner={isWinner}
                    onClick={() => handleWinnerSelection(nominee, 1, matchup, seed)}
                  />
                )
              }),
            )}
          </div>

          <BracketConnector pairs={4} />

          <div className="h-full flex flex-col justify-around">
            {[0, 1].flatMap((matchup) =>
              [0, 1].map((index) => {
                const nominee = winners[matchup * 2 + index]
                const seed = winnerSeeds[matchup * 2 + index]
                if (!nominee) return <BracketPlaceholder key={`${matchup}-${index}`} />
                const isWinner = winnersTwo[matchup] === nominee
                return (
                  <MatchupCard
                    key={`${matchup}-${index}`}
                    nominee={nominee}
                    seed={seed}
                    accent="accent2"
                    isWinner={isWinner}
                    onClick={() => handleWinnerSelection(nominee, 2, matchup, seed)}
                  />
                )
              }),
            )}
          </div>

          <BracketConnector pairs={2} />

          <div className="h-full flex flex-col justify-around">
            {[0, 1].map((index) => {
              const nominee = winnersTwo[index]
              const seed = winnerSeedsTwo[index]
              if (!nominee) return <BracketPlaceholder key={index} />
              const isWinner = winnersThree[0] === nominee
              return (
                <MatchupCard
                  key={index}
                  nominee={nominee}
                  seed={seed}
                  accent="accent3"
                  isWinner={isWinner}
                  animatePop={isWinner}
                  onClick={() => handleWinnerSelection(nominee, 3, 0, seed)}
                />
              )
            })}
          </div>
        </div>

        {/* Mobile: one active round at a time */}
        <div className="md:hidden flex flex-col">
          <div className={`w-full space-y-4 ${roundOneComplete ? "hidden" : "block"}`}>
            {[0, 1, 2, 3].map((matchup) => (
              <div key={matchup} className="space-y-2">
                {[0, 1].map((index) => {
                  const nominee = game.nominees[matchup * 2 + index]
                  const seed = game.seeds[matchup * 2 + index]
                  const isWinner = winners[matchup] === nominee
                  return (
                    <MatchupCard
                      key={index}
                      nominee={nominee}
                      seed={seed}
                      accent="accent1"
                      isWinner={isWinner}
                      onClick={() => handleWinnerSelection(nominee, 1, matchup, seed)}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {roundOneComplete && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`w-full space-y-4 ${roundTwoComplete ? "hidden" : ""}`}
              >
                {[0, 1].map((matchup) => (
                  <div key={matchup} className="space-y-2">
                    {[0, 1].map((index) => {
                      const nominee = winners[matchup * 2 + index]
                      const seed = winnerSeeds[matchup * 2 + index]
                      const isWinner = winnersTwo[matchup] === nominee
                      return (
                        <MatchupCard
                          key={index}
                          nominee={nominee}
                          seed={seed}
                          accent="accent2"
                          isWinner={isWinner}
                          onClick={() => handleWinnerSelection(nominee, 2, matchup, seed)}
                        />
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {roundTwoComplete && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full space-y-2"
              >
                {[0, 1].map((index) => {
                  const nominee = winnersTwo[index]
                  const seed = winnerSeedsTwo[index]
                  const isWinner = winnersThree[0] === nominee
                  return (
                    <MatchupCard
                      key={index}
                      nominee={nominee}
                      seed={seed}
                      accent="accent3"
                      isWinner={isWinner}
                      animatePop={isWinner}
                      onClick={() => handleWinnerSelection(nominee, 3, 0, seed)}
                    />
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-surface border-2 border-gold shadow-spotlight shadow-glow-amber p-8 rounded-3xl text-center max-w-md w-full"
            >
              <MarqueeLights count={10} className="mb-6" />
              <h2 className="font-marquee text-lg text-gold mb-4 tracking-wide">🏆 And The Winner Is 🏆</h2>
              <p className="font-marquee text-3xl sm:text-4xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-orange-400 to-secondary [text-shadow:0_0_40px_rgba(255,200,51,0.35)]">
                {winner}
              </p>
              <MarqueeLights count={10} className="mt-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
