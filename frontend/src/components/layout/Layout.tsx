import { FC, ReactNode } from 'react'
import { Header } from './Header'
import { Box, Container } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Box backgroundColor="blue.400" minH="100vh">
      <Header />
      <main>{children}</main>
      <footer>
        <Box py={3} textAlign="center" color="yellow.400">
          Logo
        </Box>
      </footer>
    </Box>
  )
}
