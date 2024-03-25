import { SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const FramesAddress: NextPage = () => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${SITE_URL}/img/frames/alreadyclaimed.png`,
        }}
      />
    </>
  )
}

export default FramesAddress
