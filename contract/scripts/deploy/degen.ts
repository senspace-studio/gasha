import { deployGashaItemContract } from "../helper/nft"

const main = async () => {
  const gashaItem = await deployGashaItemContract()

  console.log("GashaItem deployed to:", await gashaItem.getAddress())
}

main()
