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
