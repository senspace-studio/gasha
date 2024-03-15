import { useAccount } from 'wagmi'
import { useReadZoraCreator1155Contract } from './useContract'

export const useBalanceOf = () => {
  const { address } = useAccount()

  const readResult = useReadZoraCreator1155Contract<'balanceOf'>('balanceOf', [
    address!,
    BigInt(1),
  ])

  return readResult
}
