import { ethers } from 'hardhat'
import MerkleTree from 'merkletreejs'
import { Gasha } from '../../typechain-types'
import { AbiCoder, keccak256, parseEther } from 'ethers'

export const deployGashaContract = async (
  zoraCreator1155Address: string,
  merkleMinterAddress: string,
  mintReferralAddress: string,
  unitPrice: number
) => {
  const gashaFactory = await ethers.getContractFactory('Gasha')
  const gasha = await gashaFactory.deploy(
    zoraCreator1155Address,
    merkleMinterAddress,
    mintReferralAddress,
    10000,
    parseEther(unitPrice.toString())
  )
  await gasha.waitForDeployment()
  return gasha
}

export const setMinterArguments = async (Gasha: Gasha, tree: MerkleTree) => {
  const leafToVerify = keccak256(
    new AbiCoder().encode(
      ['address', 'uint256', 'uint256'],
      [(await Gasha.getAddress()) as `0x${string}`, 100000, 0]
    )
  )
  const proof = tree.getHexProof(leafToVerify)

  const minterArguments = new AbiCoder().encode(
    ['address', 'uint256', 'uint256', 'bytes32[]'],
    [await Gasha.getAddress(), 100000, 0, proof]
  )

  const tx = await Gasha.setMinterArguments(minterArguments)
  await tx.wait()
}
