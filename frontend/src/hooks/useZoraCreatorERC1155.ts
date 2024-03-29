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
    const nft = 0.995
    const _rewards = readResult.data?.[0]?.result?.toString()
    if (!_rewards) return nft

    const total = Number(formatEther(BigInt(_rewards)) + nft).toFixed(3)

    return total
  }, [readResult])

  return rewards
}
