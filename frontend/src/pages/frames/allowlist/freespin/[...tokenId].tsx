import { API_URL, SITE_URL } from '@/config'
import { generateWarpcastCompose } from '@/lib/warpcast'
import { FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  imageURL: string
  warpcastText: string
}

const FreespinCongrats: NextPage<Props> = ({ imageURL, warpcastText }) => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: `${imageURL}`,
        }}
        buttons={[
          {
            action: 'link',
            label: 'Spin Again',
            target: `${SITE_URL}`,
          },
          {
            action: 'post',
            label: 'Back',
            target: `${SITE_URL}/api/frames/home`,
          },
          {
            action: 'link',
            label: 'Share',
            target: warpcastText,
          },
        ]}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const tokenId = c.params?.tokenId

  const warpcastText = generateWarpcastCompose({
    tokenId: Number(tokenId),
  })

  return {
    props: {
      imageURL: `${SITE_URL}/img/frames/congrats/${tokenId}.png`,
      warpcastText: warpcastText,
    },
  }
}

export default FreespinCongrats
