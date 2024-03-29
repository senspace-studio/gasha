import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { DefaultLayout } from '@/components/layout/Layout'
import { chakraTheme } from '@/lib/chakraTheme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { wagmiConfig } from '@/lib/wagmi'
import { GoogleTagManager } from '@next/third-parties/google'
import Head from 'next/head'

const config = wagmiConfig()

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>The Ball</title>
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          walletConnectCloudProjectId:
            process.env.NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID!,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <ChakraProvider theme={chakraTheme}>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
              />
              <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
            </ChakraProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  )
}
