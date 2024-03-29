import { API_URL, SITE_URL } from '@/config'
import { FrameButtonMetadata, FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

interface Props {
  imageURL: string
  holdingTokenIds: number[]
  address: string
  currentIndex: number
  buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]]
}

const FramesCollection: NextPage<Props> = ({
  imageURL,
  holdingTokenIds,
  address,
  currentIndex,
  buttons,
}) => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: imageURL,
        }}
        buttons={buttons}
        state={{
          holdingTokenIds,
          currentIndex,
          address,
        }}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const resolvedUrl = c.resolvedUrl

  const state = resolvedUrl.split('?')[1]?.split('=')[1]

  const parsedState = state
    ? JSON.parse(decodeURIComponent(state as string))
    : {}
  const holdingTokenIds: number[] = parsedState.holdingTokenIds || []
  const currentIndex = parsedState.currentIndex || 0
  const tokenId = holdingTokenIds[currentIndex]

  const imageURL = tokenId
    ? `${SITE_URL}/img/gacha-item/${tokenId}.png`
    : holdingTokenIds.length === 0
    ? `${SITE_URL}/img/frames/empty.png`
    : `${API_URL}/ogp/${parsedState.address}/square.png`

  const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [
    {
      action: 'post',
      label: '< Back',
      target:
        currentIndex === 0
          ? `${SITE_URL}/api/frames/home`
          : `${SITE_URL}/api/frames/collection/back`,
    },
  ]

  if (holdingTokenIds.length === 0) {
    buttons.push({
      action: 'link',
      label: 'Spin',
      target: `${SITE_URL}`,
    })
  } else {
    if (currentIndex < holdingTokenIds.length) {
      buttons.push({
        action: 'post',
        label: 'Next >',
        target: `${SITE_URL}/api/frames/collection/next`,
      })
    } else {
      buttons.push({
        action: 'post',
        label: 'Home',
        target: `${SITE_URL}/api/frames/home`,
      })
    }
  }

  return {
    props: {
      imageURL,
      holdingTokenIds,
      address: parsedState.address,
      currentIndex,
      buttons,
    },
  }
}

export default FramesCollection
