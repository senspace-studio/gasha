import { createConfig, http } from 'wagmi'
import { Chain, hardhat, localhost, zoraSepolia } from 'wagmi/chains'

const selectChain = () => {
  switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
    case '31337':
      return hardhat
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
  })
}
