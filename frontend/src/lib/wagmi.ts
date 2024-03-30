import { WALLETCONNECT_PROJECT_ID } from '@/config'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import {
  baseSepolia,
  hardhat,
  localhost,
  zoraSepolia,
  base,
} from 'wagmi/chains'

const selectChain = () => {
  switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
    case '31337':
      return hardhat
    case '84532':
      return baseSepolia
    case '8453':
      return base
    case '999999999':
      return zoraSepolia
    default:
      return localhost
  }
}

const metadata = {
  name: 'The Ball',
  description: '',
  url: 'https://www.theball.fun',
  icons: ['https://www.theball.fun/favicon.ico'],
}

export const wagmiConfig = defaultWagmiConfig({
  chains: [selectChain()],
  projectId: WALLETCONNECT_PROJECT_ID!,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
