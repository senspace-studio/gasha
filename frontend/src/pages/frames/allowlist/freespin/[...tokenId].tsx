import { API_URL, SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  imageURL: string
}

const FreespinCongrats: NextPage<Props> = ({ imageURL }) => {
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
            label: 'Share',
            target: `${API_URL}/opensea`,
          },
          {
            action: 'link',
            label: 'Spin Again',
            target: `${SITE_URL}`,
          },
        ]}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const tokenId = c.params?.tokenId

  return {
    props: {
      imageURL: `${SITE_URL}/img/frames/congrats/${tokenId}.png`,
    },
  }
}

export default FreespinCongrats
