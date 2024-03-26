import { wagmiConfig } from '@/lib/wagmi'
import { useMemo } from 'react'

export const useChain = () => {
  const config = useMemo(() => wagmiConfig(), [])
  return config
}
