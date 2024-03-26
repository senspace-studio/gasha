import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleTagManager } from '@next/third-parties/google'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>The Ball</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="stylesheet" href="https://use.typekit.net/wtj8wnw.css" />
        <meta property="og:image" content="/img/default_og.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
    </Html>
  )
}
