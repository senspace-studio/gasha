import { SITE_URL } from '@/config'
import { useRedirectTop } from '@/hooks/useFrames'
import { FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  imageURL: string
}

const FramesToken: NextPage<Props> = ({ imageURL }) => {
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
            action: 'link',
            label: 'Spin!',
            target: `${SITE_URL}`,
          },
        ]}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const tokenId = c.params?.id

  return {
    props: {
      imageURL: `${SITE_URL}/img/gacha-item/${tokenId}.png`,
    },
  }
}

export default FramesToken
