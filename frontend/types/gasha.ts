export type ResultItem = {
  name: string
  image: string
  rareness: string
  quantity: number
  tokenId: number
}

export type ResultPoint = {
  address: string
  common: ResultPointOfRareness
  rare: ResultPointOfRareness
  special: ResultPointOfRareness
}

export type ResultPointOfRareness = {
  amount: string
  points: string
}

export type Total = {
  points: string
  events: string
  nfts: string
  lastBlockNumber: string
}

export type Leaderboard = {
  data: LeaderboardItem[]
  total: number
  page: number
  pageSize: number
}

export type LeaderboardItem = {
  address: string
  points: string
}
