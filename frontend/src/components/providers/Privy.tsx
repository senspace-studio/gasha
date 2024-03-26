'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { FC, ReactNode } from 'react'

interface PrivyProviderProps {
  children: ReactNode
}

export const PrivyProviderComponent: FC<PrivyProviderProps> = ({
  children,
}) => {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} config={{}}>
      {children}
    </PrivyProvider>
  )
}
