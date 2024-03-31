import { API_URL, SITE_URL } from '@/config'
import { useRedirectTop } from '@/hooks/useFrames'
import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

export const LeaderboardFrame: NextPage = () => {
  useRedirectTop()

  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${API_URL}/ogp/leaderboard.png`,
        }}
        buttons={[
          {
            action: 'post',
            label: 'Back',
            target: `${SITE_URL}/api/frames/home`,
          },
        ]}
      />
    </>
  )
}

export default LeaderboardFrame
