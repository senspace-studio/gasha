import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useSwitchChain as wagmiSwitchChain } from 'wagmi'

export const useSwitchChain = () => {
  const { switchChainAsync, status } = wagmiSwitchChain()
  const [switched, setSwitched] = useState(false)

  const handleSwitchChain = useCallback(async () => {
    try {
      await switchChainAsync(
        {
          chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        },
        {
          onSuccess: () => {
            setSwitched(true)
            toast.info('Switched!')
          },
          onError: () => {
            toast.error('Failed to switch network')
          },
        }
      )
    } catch (error: any) {
      if (error.message?.includes('already pending')) {
        toast.info('Please check your wallet to switch network')
      } else {
        toast.error('Failed to switch network')
      }
    }
  }, [switchChainAsync, status])

  return { handleSwitchChain, switched }
}
