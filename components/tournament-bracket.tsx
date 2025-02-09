import type { TournamentRound } from "@/types/tournament"

interface TournamentBracketProps {
  rounds: TournamentRound[]
}

export function TournamentBracket({ rounds }: TournamentBracketProps) {
  return (
    <div className="flex gap-8 overflow-x-auto p-4">
      {rounds.map((round) => (
        <div key={round.id} className="flex flex-col gap-4">
          {round.pairs.map((pair, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="border border-white/20 p-4 min-w-[200px]">
                <div className="text-sm">{pair[0].title}</div>
                <div className="text-xs text-white/60">{pair[0].votes} votes</div>
              </div>
              <div className="border border-white/20 p-4 min-w-[200px]">
                <div className="text-sm">{pair[1].title}</div>
                <div className="text-xs text-white/60">{pair[1].votes} votes</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

