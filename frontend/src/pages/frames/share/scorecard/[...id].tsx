import { API_URL, SITE_URL } from '@/config'
import { FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  imageURL: string
}

export const ScorecardFrame: NextPage<Props> = ({ imageURL }) => {
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
  const id = c.params?.id

  return {
    props: {
      imageURL: `${API_URL}/result/${id}/square.png`,
    },
  }
}

export default ScorecardFrame