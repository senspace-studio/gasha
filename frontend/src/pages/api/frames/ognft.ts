// create next.js api handler
import { SITE_URL } from "@/config"
import { QUANTITIES_OF_MINT } from "@/constants/quantities_of_mint"
import { gashaAxios } from "@/lib/gashaAPI"
import { NextApiRequest, NextApiResponse } from "next"
import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"
import { normalize } from "viem/ens"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await gashaAxios.post("/neynar/verify", {
      messageBytes: req.body.trustedData.messageBytes,
    })

    const inputText = data.action.input.text
    let address: string = ""

    if (
      !(inputText.startsWith("0x") && inputText.length === 42) &&
      !inputText.endsWith(".eth")
    ) {
      res.redirect(303, `${SITE_URL}/frames/error`)
    } else if (inputText.endsWith(".eth")) {
      try {
        const client = createPublicClient({
          chain: mainnet,
          transport: http(),
        })
        address = (await client.getEnsAddress({
          name: normalize(inputText),
        })) as string
        if (!address) {
          res.redirect(303, `${SITE_URL}/frames/error`)
        }
      } catch (error) {
        res.redirect(303, `${SITE_URL}/frames/error`)
      }
    } else {
      address = inputText
    }

    const quantities = QUANTITIES_OF_MINT.find(
      (item) => item.address.toLowerCase() === address.toLowerCase()
    )?.quantities

    if (!quantities) {
      res.redirect(303, `${SITE_URL}/frames/ognft/not-eligible`)
      return
    }

    switch (true) {
      case quantities >= 500:
        res.redirect(
          302,
          `https://zora.co/collect/base:0x9aca367cc335acc784ab2cca59e0f1a9797d9d12/1`
        )
        return

      case quantities >= 50:
        res.redirect(
          302,
          `https://zora.co/collect/base:0x9aca367cc335acc784ab2cca59e0f1a9797d9d12/2`
        )
        return

      case quantities >= 1:
        res.redirect(
          302,
          `https://zora.co/collect/base:0x9aca367cc335acc784ab2cca59e0f1a9797d9d12/3`
        )
        return

      default:
        res.redirect(303, `${SITE_URL}/frames/ognft/not-eligible`)
        return
    }
  } catch (error) {
    res.redirect(303, `${SITE_URL}/frames/error`)
  }
}
