import { useAccount } from 'wagmi'
import {
  useMultiReadProtocolRewardsContract,
  useReadZoraCreator1155Contract,
} from './useContract'
import { useMemo } from 'react'
import { formatEther, parseEther } from 'viem'

const poolAddress = process.env
  .NEXT_PUBLIC_ZORA_PROTOCOL_REWARDS_POOL_ADDRESS! as `0x${string}`

export const useBalanceOf = () => {
  const { address } = useAccount()

  const readResult = useReadZoraCreator1155Contract<'balanceOf'>('balanceOf', [
    address!,
    BigInt(1),
  ])

  return readResult
}

export const useBalanceOfRewards = () => {
  const readResult = useMultiReadProtocolRewardsContract([
    {
      functionName: 'balanceOf',
      args: [poolAddress],
    },
  ])

  const rewards = useMemo(() => {
    const rewards = readResult.data?.[0]?.result?.toString()
    if (!rewards) return 0
    return formatEther(BigInt(rewards))
  }, [readResult])

  return rewards
}
