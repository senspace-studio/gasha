import dotenv from "dotenv"
dotenv.config()

export const DEGEN_CONTRACT_ADDRESS = process.env
  .DEGEN_CONTRACT_ADDRESS as `0x${string}`
export const DEPOSIT_WALLET_ADDRESS = process.env
  .DEPOSIT_WALLET_ADDRESS as `0x${string}`
export const API_BASE_URL = process.env.API_BASE_URL as string
