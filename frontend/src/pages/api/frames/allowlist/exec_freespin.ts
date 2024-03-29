import { SITE_URL } from '@/config'
import { gashaAxios } from '@/lib/gashaAPI'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await gashaAxios.post('/allowlist/claim', {
      address: req.body.untrustedData?.inputText,
    })
    res.redirect(303, `${SITE_URL}/frames/allowlist/freespin/${data.tokenId}`)
  } catch (error: any) {
    console.log(error.response.data.message)
    switch (error.response.data.message) {
      case 'Not listed':
        res.redirect(303, `${SITE_URL}/frames/allowlist/freespin/not-listed`)
        return
      case 'Already claimed':
        res.redirect(
          303,
          `${SITE_URL}/frames/allowlist/freespin/already-claimed`
        )
        return
      default:
        res.redirect(303, `${SITE_URL}/frames/error`)
        return
    }
  }
}
