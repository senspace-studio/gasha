import { wagmiConfig } from '@/lib/wagmi'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useSwitchChain as wagmiSwitchChain } from 'wagmi'

export const useChain = () => {
  const config = useMemo(() => wagmiConfig(), [])
  return config
}

export const useSwitchChain = () => {
  const { switchChainAsync, status } = wagmiSwitchChain()

  const switchChain = useCallback(async () => {
    try {
      await switchChainAsync({
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
      })
      toast.info('Switched!')
    } catch (error: any) {
      if (error.message?.includes('already pending')) {
        toast.info('Please check your wallet to switch network')
      } else {
        toast.error('Failed to switch network')
      }
    }
  }, [switchChainAsync, status])

  return { switchChain }
}
