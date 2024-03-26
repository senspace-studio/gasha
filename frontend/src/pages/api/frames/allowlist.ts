// write hellow world api of next api route

import { SITE_URL } from '@/config'
import { gashaAxios } from '@/lib/gashaAPI'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await gashaAxios.post('/allowlist', req.body)
    res.redirect(307, `${SITE_URL}/frames/allowlist/claimed`)
  } catch (error: any) {
    console.error(error)

    switch (error.response.data.message) {
      case 'Allowlist is full':
        res.redirect(307, `${SITE_URL}/frames/allowlist/outoofstock`)
        return
      case 'Invalid request':
        res.redirect(307, `${SITE_URL}/frames/allowlist/error`)
        return
      case 'Already claimed':
        res.redirect(307, `${SITE_URL}/frames/allowlist/alreadyclaimed`)
        return
      default:
        res.redirect(307, `${SITE_URL}/frames/allowlist/error`)
        return
    }
  }
}
