import { Button, Frog, parseEther, TextInput } from "frog"
import {
  DEGEN_CONTRACT_ADDRESS,
  DEPOSIT_WALLET_ADDRESS,
} from "../constants/config"
import { DEGEN_ABI } from "../constants/abi"
import { SyndicateClient } from "@syndicateio/syndicate-node"
import {
  gashaContractTransactionReceipt,
  parseGashaContractLog,
} from "../lib/viem"

const syndicate = new SyndicateClient({ token: "0zXOhfKdn0xvW7vDBWCQ" })

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
    image: <>The Ball</>,
    imageAspectRatio: "1:1",
    intents: [<Button action="/top">Start</Button>],
  })
})

theballApp.frame("/top", (c) => {
  return c.res({
    image: <div>The Ball Top</div>,
    imageAspectRatio: "1:1",
    intents: [
      <Button action="/spin">Spin</Button>,
      <Button action="/stats">Stats</Button>,
    ],
  })
})

theballApp.frame("/spin", (c) => {
  return c.res({
    image: (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontSize: 60,
          fontStyle: "normal",
          marginLeft: "220px",
        }}
      >
        The Ball Spin
      </div>
    ),
    imageAspectRatio: "1:1",
    action: "/mint",
    intents: [
      <TextInput placeholder="Number of Spin" />,
      <Button.Transaction target="/send-degen">Add Tokens</Button.Transaction>,
    ],
  })
})

theballApp.frame("/mint", async (c) => {
  const tx = await syndicate.transact.sendTransaction({
    projectId: "3dea3dbd-83bc-4625-97aa-28161dc27aa4",
    contractAddress: "0x8cC40aa52A79b378AC4C5d9CB155521778372b76",
    chainId: 666666666,
    functionSignature: "spin(uint256 quantity, address to)",
    args: {
      quantity: 10,
      to: "0xdCb93093424447bF4FE9Df869750950922F1E30B",
    },
  })

  c.deriveState((prev) => {
    prev.transactionId = tx.transactionId
  })

  return c.res({
    image: (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontSize: 60,
          fontStyle: "normal",
          padding: "0 220px",
        }}
      >
        The Ball Mint Page
      </div>
    ),
    imageAspectRatio: "1:1",
    intents: [<Button action="/result">Open</Button>],
  })
})

theballApp.frame("/result", async (c) => {
  const transactionId = c.previousState.transactionId

  const tx = await (
    await fetch(
      `https://api.syndicate.io/wallet/project/3dea3dbd-83bc-4625-97aa-28161dc27aa4/request/${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer 0zXOhfKdn0xvW7vDBWCQ",
        },
      }
    )
  ).json()

  const txHash = tx.transactionAttempts[0].hash

  const logs = await gashaContractTransactionReceipt(txHash)

  const events = parseGashaContractLog(logs.logs)

  console.log(events[0].args)

  return c.res({
    image: <div>The Ball Result</div>,
    imageAspectRatio: "1:1",
    intents: [
      <Button action="/top">Back</Button>,
      <Button.Link href="/">Share</Button.Link>,
    ],
  })
})

theballApp.transaction("/send-degen", (c) => {
  const numOfSpin = Number(c.inputText)

  if (typeof numOfSpin !== "number" || numOfSpin < 1) {
    return c.contract({} as any)
  }

  const requiredDegen = Number(c.inputText) * 100
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
