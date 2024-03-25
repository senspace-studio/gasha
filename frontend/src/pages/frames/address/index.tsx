import { FrameMetadata } from '@coinbase/onchainkit'
import { NextPage } from 'next'

const FramesAddress: NextPage = () => {
  return (
    <>
      <FrameMetadata
        image={{
          aspectRatio: '1:1',
          src: 'https://a569-118-236-228-93.ngrok-free.app/img/frames/address_grab.png',
        }}
        input={{ text: 'Enter your address or ENS' }}
        buttons={[
          {
            action: 'post',
            label: 'Submit',
            target:
              'https://a569-118-236-228-93.ngrok-free.app/frames/address/submit',
          },
        ]}
      />
    </>
  )
}

export default FramesAddress
