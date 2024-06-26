// write hellow world api of next api route

import { SITE_URL } from '@/config'
import { gashaAxios } from '@/lib/gashaAPI'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await gashaAxios.post('/allowlist', req.body)
    res.redirect(303, `${SITE_URL}/frames/allowlist/claimed`)
  } catch (error: any) {
    switch (error.response.data.message) {
      case 'Allowlist is full':
        res.redirect(303, `${SITE_URL}/frames/allowlist/outofstock`)
        return
      case 'Invalid request':
        res.redirect(303, `${SITE_URL}/frames/allowlist/error`)
        return
      case 'Already claimed':
        res.redirect(303, `${SITE_URL}/frames/allowlist/alreadyclaimed`)
        return
      case 'Is not eligible':
        res.redirect(303, `${SITE_URL}/frames/allowlist/not-eligible`)
        return
      default:
        res.redirect(303, `${SITE_URL}/frames/allowlist/error`)
        return
    }
  }
}
