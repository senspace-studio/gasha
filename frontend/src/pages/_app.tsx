import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { wagmiConfig } from '@/lib/wagmi'
import { DefaultLayout } from '@/components/layout/Layout'
import { chakraTheme } from '@/lib/chakraTheme'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} config={{}}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig()}>
          <ChakraProvider theme={chakraTheme}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </ChakraProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
