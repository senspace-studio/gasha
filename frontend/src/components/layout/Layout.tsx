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
        <h1>Footer</h1>
      </footer>
    </Box>
  )
}
