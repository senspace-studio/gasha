import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { FC, useCallback, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useSetActiveWallet } from '@privy-io/wagmi'

export const Header: FC = () => {
  const { connectWallet } = usePrivy()
  const { disconnect } = useDisconnect()

  const { isConnected, address } = useAccount()
  const { wallets } = useWallets()
  const { setActiveWallet } = useSetActiveWallet()

  const handleConnectWallet = useCallback(() => {
    if (isConnected) {
      disconnect()
    } else {
      connectWallet()
    }
  }, [isConnected])

  useEffect(() => {
    const setWallet = async () => {
      if (wallets.length > 0) await setActiveWallet(wallets[0])
    }
    setWallet()
  }, [wallets])

  return (
    <header>
      <HStack px={[2, 4]} py={2} justifyContent="space-between">
        <Box>
          <Icon as={HamburgerIcon} color="yellow.300" fontSize="3xl" />
          Gasha
        </Box>
        <Button
          onClick={handleConnectWallet}
          backgroundColor="yellow.300"
          borderRadius="full"
        >
          {isConnected
            ? `${address?.slice(0, 5)}...${address?.slice(-4)}`
            : 'Connect Wallet'}
        </Button>
      </HStack>
    </header>
  )
}
