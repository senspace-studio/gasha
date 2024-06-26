import { ethers, upgrades } from 'hardhat'
import MerkleTree from 'merkletreejs'
import { Gasha } from '../../typechain-types'
import { AbiCoder, keccak256, parseEther } from 'ethers'

export const deployGashaContract = async (
  adminAddress: string,
  zoraCreator1155Address: string,
  merkleMinterAddress: string,
  mintReferralAddress: string,
  unitPrice: number
) => {
  const gashaFactory = await ethers.getContractFactory('Gasha')

  const gasha = (await upgrades.deployProxy(
    gashaFactory,
    [
      adminAddress,
      zoraCreator1155Address,
      merkleMinterAddress,
      mintReferralAddress,
      10000,
      parseEther(unitPrice.toString()),
    ],
    {
      initializer: 'initialize',
    }
  )) as any as Gasha
  console.log(zoraCreator1155Address)
  console.log(merkleMinterAddress)
  console.log(mintReferralAddress)
  console.log(10000)
  console.log(parseEther(unitPrice.toString()))
  await gasha.waitForDeployment()
  return gasha
}

export const setMinterArguments = async (Gasha: Gasha, tree: MerkleTree) => {
  const leafToVerify = keccak256(
    new AbiCoder().encode(
      ['address', 'uint256', 'uint256'],
      [(await Gasha.getAddress()) as `0x${string}`, 10e9, 0]
    )
  )
  const proof = tree.getHexProof(leafToVerify)

  const minterArguments = new AbiCoder().encode(
    ['address', 'uint256', 'uint256', 'bytes32[]'],
    [await Gasha.getAddress(), 10e9, 0, proof]
  )

  const tx = await Gasha.setMinterArguments(minterArguments)
  await tx.wait()
}
