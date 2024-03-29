import { SITE_URL } from '@/config'
import { FrameButtonMetadata, FrameMetadata } from '@coinbase/onchainkit'
import { GetServerSideProps, NextPage } from 'next'

interface Props {
  imageURL: string
  holdingTokenIds: number[]
  currentIndex: number
  buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]]
}

const FramesCollection: NextPage<Props> = ({
  imageURL,
  holdingTokenIds,
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
    : currentIndex === holdingTokenIds.length
    ? `${SITE_URL}/img/frames/error.png`
    : `${SITE_URL}/img/frames/empty.png`

  const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [
    {
      action: 'post',
      label: '< Back',
      target:
        tokenId && currentIndex === 0
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
    buttons.push({
      action: 'link',
      label: 'Share',
      target: `${SITE_URL}/opensea`,
    })

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
      currentIndex,
      buttons,
    },
  }
}

export default FramesCollection
