import { Button } from '@chakra-ui/react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { FC, useCallback } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

export const Header: FC = () => {
  const { connectWallet } = usePrivy()
  const { disconnect } = useDisconnect()

  const { isConnected } = useAccount()
  const { wallets } = useWallets()

  const handleConnectWallet = useCallback(() => {
    if (isConnected) {
      disconnect()
    } else {
      connectWallet()
    }
  }, [isConnected, wallets])

  return (
    <header>
      <Button onClick={handleConnectWallet}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </Button>
    </header>
  )
}
