import { Button, Frog, parseEther, TextInput } from "frog"
import {
  API_BASE_URL,
  DEGEN_CONTRACT_ADDRESS,
  DEPOSIT_WALLET_ADDRESS,
} from "../constants/config"
import { DEGEN_ABI } from "../constants/abi"
import { apiClient } from "../lib/api"

type State = {
  transactionId: string
}

export const theballApp = new Frog<{ State: State }>({
  initialState: {
    transactionId: "",
  },
})

theballApp.frame("/", (c) => {
  return c.res({
    image: "/card/top.png",
    imageAspectRatio: "1:1",
    intents: [<Button action="/top">Start</Button>],
  })
})

theballApp.frame("/top", (c) => {
  return c.res({
    image: "/card/top.png",
    imageAspectRatio: "1:1",
    intents: [
      <Button action="/draw">Draw</Button>,
      <Button action="/stats">Stats</Button>,
    ],
  })
})

theballApp.frame("/draw", (c) => {
  const numOfMint = Number(c.inputText)

  return c.res({
    image: "/card/draw.png",
    imageAspectRatio: "1:1",
    intents: [
      typeof numOfMint == "number" &&
      numOfMint > 0 &&
      numOfMint < 1000 ? null : (
        <TextInput placeholder="Number of cards to draw" />
      ),
      <Button.Transaction target="/send-degen/1" action={`/mint/1`}>
        1 card
      </Button.Transaction>,
      <Button.Transaction target="/send-degen/5" action={`/mint/5`}>
        5 cards
      </Button.Transaction>,
      <Button.Transaction target="/send-degen/10" action={`/mint/10`}>
        10 cards
      </Button.Transaction>,
      typeof numOfMint == "number" && numOfMint > 0 && numOfMint < 1000 ? (
        <Button.Transaction
          target={`/send-degen/${numOfMint}`}
          action={`/mint/${numOfMint}`}
        >
          {`${numOfMint}`} cards
        </Button.Transaction>
      ) : (
        <Button action="/draw">Custom</Button>
      ),
    ],
  })
})

theballApp.frame("/mint/:numOfMint", async (c) => {
  const frameData = await c.req.bodyCache.json
  const { data } = await apiClient.post("/gasha/syndicate/spin", {
    messageBytes: frameData.trustedData.messageBytes,
    numOfMint: Number(c.req.param("numOfMint")),
  })

  c.deriveState((prevState) => {
    prevState.transactionId = data.transactionId
  })

  return c.res({
    image: "/card/mint.png",
    imageAspectRatio: "1:1",
    intents: [<Button action="/score">Open</Button>],
  })
})

theballApp.frame("/score", async (c) => {
  const { transactionId } = c.previousState
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const { data: result } = await apiClient.get(
      `/gasha/syndicate/spin/result/${transactionId}`
    )

    return c.res({
      image: `${API_BASE_URL}/ogp/square.png?score=${JSON.stringify(result)}`,
      imageAspectRatio: "1:1",
      intents: [
        <Button action="/top">Back</Button>,
        <Button.Link href="https://google.com">Share</Button.Link>,
      ],
    })
  } catch (error) {
    return c.res({
      image: "/card/mint.png",
      imageAspectRatio: "1:1",
      intents: [<Button action="/score">Retry</Button>],
    })
  }
})

theballApp.transaction("/send-degen/:numOfMint", async (c) => {
  const numOfMint = Number(c.req.param("numOfMint"))
  const requiredDegen = numOfMint * 100

  return c.contract({
    chainId: "eip155:84532",
    to: DEGEN_CONTRACT_ADDRESS,
    abi: DEGEN_ABI,
    functionName: "transfer",
    args: [DEPOSIT_WALLET_ADDRESS, parseEther(requiredDegen.toString())],
  })
})

theballApp.frame("/stats", (c) => {
  return c.res({
    image: <div>The Ball Stats</div>,
    imageAspectRatio: "1:1",
    intents: [
      <Button action="/top">Back</Button>,
      <Button.Link href="/">Share</Button.Link>,
    ],
  })
})
