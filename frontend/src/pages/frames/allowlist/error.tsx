import { SITE_URL } from '@/config'
import { useRedirectTop } from '@/hooks/useFrames'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const FramesAddress: NextPage = () => {
  useRedirectTop()

  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${SITE_URL}/img/frames/error.png`,
        }}
        input={{ text: 'Enter your address or ENS' }}
        buttons={[
          {
            action: 'post',
            label: 'Retry',
            target: `${SITE_URL}/api/frames/allowlist`,
          },
        ]}
      />
    </>
  )
}

export default FramesAddress
