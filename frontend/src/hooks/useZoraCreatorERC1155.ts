import { useAccount } from 'wagmi'
import {
  useMultiReadProtocolRewardsContract,
  useReadZoraCreator1155Contract,
} from './useContract'
import { useEffect, useMemo, useState } from 'react'
import { createPublicClient, formatEther, http, parseEther } from 'viem'
import { base, zora } from 'viem/chains'
import { ZoraProtocolRewardsAbi } from '@/abi/protocolRewards'
import {
  GASHA_ADDRESS,
  POOL_WALLET_ADDRESS,
  ZORA_PROTOCOL_REWARDS_ADDRESS,
} from '@/config'

export const useBalanceOf = () => {
  const { address } = useAccount()

  const readResult = useReadZoraCreator1155Contract<'balanceOf'>('balanceOf', [
    address!,
    BigInt(1),
  ])

  return readResult
}

export const useBalanceOfRewards = () => {
  const [totalRewards, setTotalRewards] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const basePublicClient = createPublicClient({
        chain: base,
        transport: http(),
      })

      const zoraPublicClient = createPublicClient({
        chain: zora,
        transport: http(),
      })

      const addresses = [
        POOL_WALLET_ADDRESS,
        '0xF98B7e44EFe4c60264564554B885ab884D0dd904',
      ] as `0x${string}`[]

      const results = await Promise.all([
        ...addresses.map((address) =>
          basePublicClient.readContract({
            abi: ZoraProtocolRewardsAbi,
            address: ZORA_PROTOCOL_REWARDS_ADDRESS,
            functionName: 'balanceOf',
            args: [address],
          })
        ),
        ...addresses.map((address) =>
          zoraPublicClient.readContract({
            abi: ZoraProtocolRewardsAbi,
            address: ZORA_PROTOCOL_REWARDS_ADDRESS,
            functionName: 'balanceOf',
            args: [address],
          })
        ),
      ])

      const totalRewards = results.reduce((acc, result) => {
        return acc + result
      }, BigInt(0))

      setTotalRewards(Number(formatEther(totalRewards)) + 0.771228)
    }

    fetch()
  }, [])

  return totalRewards
}
