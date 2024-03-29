import { SITE_URL } from '@/config'
import { NextApiRequest, NextApiResponse } from 'next'

type state = { holdingTokenIds: number[]; currentIndex: number }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.body.untrustedData.state

  const stateObj: state = JSON.parse(decodeURIComponent(state))
  const newState = { ...stateObj, currentIndex: stateObj.currentIndex + 1 }

  res.redirect(
    303,
    `${SITE_URL}/frames/collection?state=${encodeURIComponent(
      JSON.stringify(newState)
    )}`
  )
}
