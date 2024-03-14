import { ethers } from 'hardhat'
import {
  addPermission,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployZoraCreatorERC1155Factory,
} from '../helper/zora'
import { deployGashaContract, setMinterArguments } from '../helper/gasha'
import { zeroAddress } from 'viem'
import MerkleTree from 'merkletreejs'

async function main() {
  const [admin, fundRecipient] = await ethers.getSigners()

  // Deploy Zora Families
  const contracts = await deployZoraCreatorERC1155Factory()
  const createZoraCreator1155Address = await createZoraCreator1155(
    contracts.zoraCreatorERC1155Factory,
    admin.address,
    fundRecipient.address
  )
  const ZoraCreator1155 = await ethers.getContractAt(
    'ZoraCreator1155Impl',
    createZoraCreator1155Address!
  )

  // Deploy Gasha
  const gashaContract = await deployGashaContract(
    createZoraCreator1155Address!,
    await contracts.merkelMinter.getAddress(),
    fundRecipient.address
  )

  // Setup Tokens
  for (const tokenId of [1, 2, 3]) {
    let tx = await ZoraCreator1155.setupNewTokenWithCreateReferral(
      `https://zora.co/${tokenId}`,
      100000,
      fundRecipient.address
    )
    await tx.wait()
    await addPermission(
      ZoraCreator1155,
      tokenId,
      await contracts.merkelMinter.getAddress()
    )
  }

  // Setup Sales
  const leaves: [string, number, number][] = [
    [zeroAddress, 0, 0],
    [await gashaContract.getAddress(), 100000, 0],
  ]

  let tree!: MerkleTree
  for (const tokenId of [1, 2, 3]) {
    const { merkleTree } = await callSaleForMerkleMinter(
      ZoraCreator1155,
      await contracts.merkelMinter.getAddress(),
      leaves,
      fundRecipient.address,
      tokenId
    )
    tree = merkleTree
  }

  await setMinterArguments(gashaContract, tree)

  // Add Gasha series
  let tx = await gashaContract.setNewSeriesItem(1, 0, 800)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(2, 1, 150)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(3, 2, 50)
  await tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
