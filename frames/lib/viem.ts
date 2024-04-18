import { createPublicClient, http, Log, parseEventLogs } from "viem"
import { GASHA_ABI } from "../constants/abi"
import { degen } from "viem/chains"

export const degenPublicProvider = createPublicClient({
  chain: degen,
  transport: http(),
})

export const gashaContractTransactionReceipt = async (
  txHash: `0x${string}`
) => {
  return degenPublicProvider.getTransactionReceipt({ hash: txHash })
}

export const parseGashaContractLog = (logs: Log[]) =>
  parseEventLogs({
    abi: GASHA_ABI,
    logs,
  })
