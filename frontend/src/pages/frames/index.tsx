import { SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const MainFrame: NextPage = () => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${SITE_URL}/img/frames/top.png`,
        }}
        buttons={[
          {
            action: 'link',
            label: 'Spin',
            target: `${SITE_URL}`,
          },
          // {
          //   action: 'post',
          //   label: 'Leaderboard',
          //   target: `${SITE_URL}/api/frames/leaderboard`,
          // },
          {
            action: 'post',
            label: 'Collection',
            target: `${SITE_URL}/api/frames/collection`,
          },
          {
            action: 'post',
            label: 'Free Spin',
            target: `${SITE_URL}/api/frames/allowlist/freespin`,
          },
        ]}
      />
    </>
  )
}

export default MainFrame
