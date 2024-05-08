import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons"
import { FC, useEffect, useRef } from "react"
import { useAccount } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { StolzlText } from "../uiparts/StolzlText"
import { FarcasterIcon } from "../uiparts/icons/FarcasterIcon"
import Image from "next/image"
import { ABCGravityVariableText } from "../uiparts/ABCGravityVariableText"

const links = [
  { path: "/", name: "Top" },
  { path: "/rules", name: "Rules" },
  { path: "/leaderboard", name: "Leaderboard" },
  {
    path: "https://drive.google.com/drive/folders/1cF1POI3XiuPB5sqGyvL_KIO08o8lQQ0d?usp=drive_link",
    name: (
      <>
        Brand Assets (ball)
        <ExternalLinkIcon ml={3} fontSize="3xl" />
      </>
    ),
    target: "_blank",
  },
  {
    path: "https://www.figma.com/file/rhERSNCi69g01k8yjo4ksb/747-Airlines-Brand-%2B-Meme?type=design&node-id=0-1&mode=design&t=nKCmCB1WZbFF7Czh-0",
    name: (
      <>
        Brand Assets (747)
        <ExternalLinkIcon ml={3} fontSize="3xl" />
      </>
    ),
    target: "_blank",
  },
]

const socialLinks: any[] = [
  {
    path: "https://warpcast.com/~/channel/ball",
    icon: <FarcasterIcon fontSize="48px" />,
  },
]

export const Header: FC = () => {
  const { open } = useWeb3Modal()
  const { address } = useAccount()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    onClose()
  }, [asPath])

  return (
    <header>
      <HStack px={[2, 5]} py={[2, 5]} justifyContent="space-between">
        <Flex alignItems="center" gap={3}>
          <Icon
            as={HamburgerIcon}
            color="yellow.300"
            fontSize="3xl"
            onClick={onOpen}
            cursor="pointer"
          />
          <Link href="/">
            <Image alt="logo" src="/img/logo.png" width="35" height="35" />
          </Link>
        </Flex>
        <Button
          onClick={() => open()}
          backgroundColor="yellow.300"
          borderRadius="full"
        >
          <StolzlText fontWeight={500}>
            {address
              ? `${address?.slice(0, 5)}...${address?.slice(-4)}`
              : "Connect Wallet"}
          </StolzlText>
        </Button>
      </HStack>

      <Drawer
        placement={"left"}
        finalFocusRef={btnRef}
        size={"md"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter="blur(24px)" />
        <DrawerContent
          backgroundColor="yellow.400"
          borderRadius="0 40px 40px 0"
        >
          <DrawerHeader padding={0} pl={["6px", "24px"]}>
            <Flex
              h={["80px", "128px"]}
              align="center"
              color="black"
              position="relative"
              paddingX={2}
            >
              <Button onClick={onClose} ref={btnRef} bg={"none"} paddingX={0}>
                <CloseIcon w={"18px"} h={"18px"} />
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody pl={["20px", "40px"]} pt={"30px"}>
            <Stack spacing={3} align="stretch" marginBottom={"33px"}>
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  target={link.target || "_self"}
                >
                  <Text fontSize="3xl" color="blue.400" whiteSpace={"nowrap"}>
                    <ABCGravityVariableText fontWeight={500}>
                      {link.name}
                    </ABCGravityVariableText>
                  </Text>
                </Link>
              ))}
            </Stack>
            <Stack direction={"row"} gap={8} marginTop={"40vh"}>
              {socialLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Center w="40px" h="40px">
                    {link.icon}
                  </Center>
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
