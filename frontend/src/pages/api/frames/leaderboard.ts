import { SITE_URL } from '@/config'
import { gashaAxios } from '@/lib/gashaAPI'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await gashaAxios.post('/neynar/verify', {
      messageBytes: req.body.trustedData.messageBytes,
    })
    const address =
      data?.action?.interactor?.verified_addresses?.eth_addresses?.[0]

    if (address) {
      res.redirect(303, `${SITE_URL}/frames/leaderboard/${address}`)
    } else {
      res.redirect(303, `${SITE_URL}/frames/leaderboard`)
    }
  } catch (error) {
    res.redirect(303, `${SITE_URL}/frames/leaderboard`)
  }
}
