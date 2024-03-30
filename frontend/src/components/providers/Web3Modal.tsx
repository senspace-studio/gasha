import { WALLETCONNECT_PROJECT_ID } from '@/config'
import { wagmiConfig } from '@/lib/wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { FC, ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

type Props = {
  children: ReactNode
}

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: WALLETCONNECT_PROJECT_ID!,
  themeMode: 'light',
})

export const Web3ModalProvider: FC<Props> = ({ children }) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
