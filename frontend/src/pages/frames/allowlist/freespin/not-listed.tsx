import { SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const FreespinHome: NextPage = () => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${SITE_URL}/img/frames/not_listed.png`,
        }}
        buttons={[
          {
            action: 'link',
            label: 'Spin',
            target: `${SITE_URL}`,
          },
        ]}
      />
    </>
  )
}

export default FreespinHome
