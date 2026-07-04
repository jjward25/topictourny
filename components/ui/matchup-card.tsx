"use client"

import { motion } from "framer-motion"

type Accent = "accent1" | "accent2" | "accent3"

const accentClasses: Record<Accent, { medallion: string; selected: string; hover: string }> = {
  accent1: {
    medallion: "bg-gradient-to-br from-sky-300 to-accent1 text-slate-950 shadow-glow-cyan",
    selected: "border-accent1 bg-accent1/15 shadow-glow-cyan",
    hover: "hover:border-accent1/60 hover:bg-accent1/10",
  },
  accent2: {
    medallion: "bg-gradient-to-br from-rose-300 to-accent2 text-slate-950 shadow-glow",
    selected: "border-accent2 bg-accent2/15 shadow-glow",
    hover: "hover:border-accent2/60 hover:bg-accent2/10",
  },
  accent3: {
    medallion: "bg-gradient-to-br from-yellow-200 to-gold text-slate-950 shadow-glow-amber",
    selected: "border-gold bg-gold/15 shadow-glow-amber",
    hover: "hover:border-gold/60 hover:bg-gold/10",
  },
}

interface MatchupCardProps {
  nominee: string
  seed: string
  accent: Accent
  isWinner: boolean
  animatePop?: boolean
  onClick: () => void
}

export function MatchupCard({ nominee, seed, accent, isWinner, animatePop, onClick }: MatchupCardProps) {
  const styles = accentClasses[accent]
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`h-12 flex items-center gap-3 pl-2 pr-4 cursor-pointer rounded-2xl border-2 transition-colors duration-200 ${
        isWinner ? `${styles.selected} ${animatePop ? "animate-pop" : ""}` : `border-white/10 bg-surface ${styles.hover}`
      }`}
    >
      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-black text-xs ${styles.medallion}`}>
        {seed}
      </div>
      <div className="flex-grow text-left font-medium truncate">{nominee}</div>
    </motion.div>
  )
}

export function BracketPlaceholder() {
  return (
    <div className="h-12 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-xs uppercase tracking-wider text-muted/40">
      TBD
    </div>
  )
}
