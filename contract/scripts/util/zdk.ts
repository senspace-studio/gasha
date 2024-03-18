import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk'

const main = async () => {
  const zdk = new ZDK({
    endpoint: 'https://api.zora.co/graphql',
    networks: [
      {
        network: ZDKNetwork.Base,
        chain: ZDKChain.BaseMainnet,
      },
    ],
  })

  const events = await zdk.events({
    where: {
      collectionAddresses: ['0x5E48E48B0FEE255783b295214D6E375FF8bf8aCF'],
    },
  })

  console.log(events)
}

main()
