import { SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const FreespinHome: NextPage = () => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${SITE_URL}/img/frames/freemint.png`,
        }}
        input={{ text: 'Enter your address or ENS' }}
        buttons={[
          {
            action: 'post',
            label: 'Spin',
            target: `${SITE_URL}/api/frames/allowlist/exec_freespin`,
          },
        ]}
      />
    </>
  )
}

export default FreespinHome
