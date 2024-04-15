/** @jsxImportSource frog/jsx */

import { Button, Frog, parseEther, TextInput } from "frog"
import { devtools } from "frog/dev"
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next"
import { serveStatic } from "frog/serve-static"

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/", (c) => {
  return c.res({
    action: "/finish",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
    ],
  })
})

app.frame("/finish", (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    ),
  })
})

app.transaction("/send-ether", (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: "eip155:84532",
    to: "0x807C69F16456F92ab2bFc9De8f14AF31051f9678",
    value: parseEther(inputText!),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
