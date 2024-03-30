import { SITE_URL } from '@/config'
import { gashaAxios } from '@/lib/gashaAPI'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { data } = await gashaAxios.post('/neynar/verify', {
  //   messageBytes: req.body.trustedData.messageBytes,
  // })
  // const address =
  //   data?.action?.interactor?.verified_addresses?.eth_addresses?.[0]
  const address = '0xdCb93093424447bF4FE9Df869750950922F1E30B'

  const state = { holdingTokenIds: [], currentIndex: 0, address: '' }
  if (address) {
    const { data: balance } = await gashaAxios.get(`/viem/balanceOf/${address}`)
    const holdingTokenIds = balance.balance
      .map((b: number, index: number) => b > 0 && index + 1)
      .filter((tokenId: number) => tokenId)
    state.holdingTokenIds = holdingTokenIds
    state.address = address
  }

  res.redirect(
    303,
    `${SITE_URL}/frames/collection?state=${encodeURIComponent(
      JSON.stringify(state)
    )}`
  )
}
