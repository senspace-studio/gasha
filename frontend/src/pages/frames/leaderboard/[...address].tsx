import { API_URL, SITE_URL } from '@/config'
import { useRedirectTop } from '@/hooks/useFrames'
import { FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  imageURL: string
}

const LeaderboardFrame: NextPage<Props> = ({ imageURL }) => {
  useRedirectTop()

  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: imageURL,
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

export const getServerSideProps: GetServerSideProps = async (c) => {
  const address = c.params?.address

  return {
    props: {
      imageURL: `${API_URL}/ogp/leaderboard.png?address=${address}&t=${new Date().getTime()}`,
    },
  }
}

export default LeaderboardFrame
