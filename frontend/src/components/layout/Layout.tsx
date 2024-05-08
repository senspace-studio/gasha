import { FC, ReactNode } from "react"
import { Header } from "./Header"
import { Box, Center, Container, Flex, Text } from "@chakra-ui/react"
import { FarcasterIcon } from "../uiparts/icons/FarcasterIcon"
import { XIcon } from "../uiparts/icons/XIcon"
import Link from "next/link"

type Props = {
  children: ReactNode
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const socialLinks: any[] = [
    {
      path: "https://warpcast.com/~/channel/ball",
      icon: <FarcasterIcon fontSize="24px" />,
    },
  ]

  return (
    <Box backgroundColor="blue.400" minH="100vh">
      <Header />
      <main>
        <Box minH="calc(100vh - 170px)">{children}</Box>
      </main>
      <footer>
        <Flex
          p={5}
          px={[5, 10]}
          justifyContent="space-between"
          color="yellow.400"
        >
          <Text mt="2px" fontSize="sm">
            Senspace All Rights Reserved.
          </Text>
          <Flex gap={2}>
            {socialLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Center>{link.icon}</Center>
              </Link>
            ))}
          </Flex>
        </Flex>
      </footer>
    </Box>
  )
}
