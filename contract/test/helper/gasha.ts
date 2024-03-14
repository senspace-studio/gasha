import { ethers } from 'hardhat'

export const deployGashaContract = async (
  zoraCreator1155Address: string,
  merkleMinterAddress: string,
  mintReferralAddress: string
) => {
  const gashaFactory = await ethers.getContractFactory('Gasha')
  const gasha = await gashaFactory.deploy(
    zoraCreator1155Address,
    merkleMinterAddress,
    mintReferralAddress,
    10000
  )
  await gasha.waitForDeployment()

  return gasha
}
