import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk'

const main = async () => {
  const zdk = new ZDK({
    endpoint: 'https://api.zora.co/graphql',
    networks: [
      {
        network: ZDKNetwork.Zora,
        chain: 'ZORA_SEPOLIA' as any,
      },
    ],
  })

  const events = await zdk.events({
    where: {
      collectionAddresses: ['0xd12175C64D479e9e3d09B9B29889A36C0942bD4d'],
    },
    filter: {
      timeFilter: {
        startDate: '2024-03-14',
        endDate: '2024-03-15',
      },
    },
  })

  console.log(events)
}

main()
