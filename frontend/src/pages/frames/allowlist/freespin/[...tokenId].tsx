import { API_URL, SITE_URL } from '@/config'
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

  const url = `${SITE_URL}/frames/share/${tokenId}`

  let warpcastText = ''
  switch (Number(tokenId)) {
    case 1:
      warpcastText =
        'A%20Common%20Coco%20Shrooms%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
      break
    case 2:
      warpcastText =
        'A%20Rare%20Tuna%20Mayo%20Ball%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
      break
    case 3:
      warpcastText =
        'A%20Special%20Ballerchicki%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
      break

    default:
      break
  }

  return {
    props: {
      imageURL: `${SITE_URL}/img/frames/congrats/${tokenId}.png`,
      warpcastText: `https://warpcast.com/~/compose?text=${warpcastText}%0A${url}`,
    },
  }
}

export default FreespinCongrats
