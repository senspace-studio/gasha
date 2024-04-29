import { ethers, upgrades } from "hardhat"
import MerkleTree from "merkletreejs"
import { Gasha } from "../../typechain-types"
import { AbiCoder, keccak256, parseEther } from "ethers"

export const deployGashaContract = async (
  adminAddress: string,
  zoraCreator1155Address: string,
  currencyAddress: string,
  mintReferralAddress: string,
  erc20MinterAddress: string,
  unitPrice: number
) => {
  const gashaFactory = await ethers.getContractFactory("Gasha")

  const gasha = (await upgrades.deployProxy(
    gashaFactory,
    [
      adminAddress,
      zoraCreator1155Address,
      currencyAddress,
      mintReferralAddress,
      erc20MinterAddress,
      10000,
      parseEther(unitPrice.toString()),
    ],
    {
      initializer: "initialize",
    }
  )) as any as Gasha

  await gasha.waitForDeployment()
  return gasha
}
