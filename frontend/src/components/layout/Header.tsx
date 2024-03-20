import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { FC, useCallback, useEffect, useRef } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useSetActiveWallet } from '@privy-io/wagmi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StolzlText } from '../uiparts/StolzlText'

const links = [
  { path: '/', name: 'Top' },
  { path: '/leaderboard', name: 'Leaderboard' },
  { path: '/about', name: 'Whitepaper' },
]

const socialLinks: any[] = [
  // {
  //   path: "https://www.instagram.com/senspace_/",
  //   icon: <InstagramIcon width={"40px"} height={"40px"} />,
  // },
  // {
  //   path: "https://twitter.com/senspace_studio",
  //   icon: <TwitterIcon width={"40px"} height={"40px"} />,
  // },
  // {
  //   path: "https://discord.gg/rbEXVBDyJj",
  //   icon: <DiscordIcon width={"40px"} height={"40px"} />,
  // },
]

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    onClose()
  }, [asPath])

  return (
    <header>
      <HStack px={[2, 4]} py={2} justifyContent="space-between">
        <Box>
          <Icon
            as={HamburgerIcon}
            color="yellow.300"
            fontSize="3xl"
            onClick={onOpen}
          />
          Gasha
        </Box>
        <Button
          onClick={handleConnectWallet}
          backgroundColor="yellow.300"
          borderRadius="full"
        >
          <StolzlText fontWeight={500}>
            {isConnected
              ? `${address?.slice(0, 5)}...${address?.slice(-4)}`
              : 'Connect Wallet'}
          </StolzlText>
        </Button>
      </HStack>

      <Drawer
        placement={'left'}
        finalFocusRef={btnRef}
        size={'sm'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter="blur(24px)" />
        <DrawerContent
          backgroundColor="yellow.400"
          borderRadius="0 40px 40px 0"
        >
          <DrawerHeader padding={0} pl="24px">
            <Flex
              h={['80px', '128px']}
              align="center"
              color="black"
              position="relative"
              paddingX={2}
            >
              <Button onClick={onClose} ref={btnRef} bg={'none'} paddingX={0}>
                <CloseIcon w={'18px'} h={'18px'} />
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody pl="40px" pt={'30px'}>
            <Stack spacing={3} align="stretch" marginBottom={'33px'}>
              {links.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Text fontSize="4xl" color="blue.400" whiteSpace={'nowrap'}>
                    <StolzlText fontWeight={500}>{link.name}</StolzlText>
                  </Text>
                </Link>
              ))}
            </Stack>
            <Stack direction={'row'} spacing={2} marginBottom={'33px'}>
              {socialLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Center w="40px" h="40px">
                    {link.icon}
                  </Center>
                </Link>
              ))}
            </Stack>
            {/* <Stack spacing={2} align="stretch" marginBottom={"33px"}>
                {footLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <Text fontSize={"13px"} color={dt.colors.mossGreen}>
                      {link.name}
                    </Text>
                  </Link>
                ))}
              </Stack> */}
          </DrawerBody>
          <DrawerFooter>
            <Text ml={[0, '50px']} mt={['28px', 0]} fontSize={'xs'}>
              ©Senspace ALL RIGHTS RESERVED
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
