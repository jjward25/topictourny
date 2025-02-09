export interface TournamentOption {
    id: string
    title: string
    votes: number
  }
  
  export interface TournamentRound {
    id: number
    pairs: [TournamentOption, TournamentOption][]
  }
  
  export interface TournamentState {
    currentRound: number
    currentPair: number
    rounds: TournamentRound[]
  }
  
  