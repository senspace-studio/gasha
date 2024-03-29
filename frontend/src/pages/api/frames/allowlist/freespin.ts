import { SITE_URL } from '@/config'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(303, `${SITE_URL}/frames/allowlist/freespin`)
}
