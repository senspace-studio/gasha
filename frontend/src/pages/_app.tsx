import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DefaultLayout } from "@/components/layout/Layout"
import { chakraTheme } from "@/lib/chakraTheme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { GoogleTagManager } from "@next/third-parties/google"
import Head from "next/head"
import { Web3ModalProvider } from "@/components/providers/Web3Modal"
import "../styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>The Ball: $CRASH Edition by Senspace & 747 Airlines</title>
      </Head>

      <Web3ModalProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Web3ModalProvider>
    </>
  )
}
