import { createConfig, http } from 'wagmi'
import {
  Chain,
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

export const wagmiConfig = () => {
  const chain: Chain = selectChain()

  return createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    },
    ssr: true,
  })
}
