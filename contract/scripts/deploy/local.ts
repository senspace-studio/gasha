import { ethers } from 'hardhat'
import {
  addPermission,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployZoraCreatorERC1155Factory,
} from '../helper/zora'
import { deployGashaContract, setMinterArguments } from '../helper/gasha'
import { maxUint64, zeroAddress } from 'viem'
import MerkleTree from 'merkletreejs'

async function main() {
  const [admin] = await ethers.getSigners()
  const fundRecipientAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

  // Deploy Zora Families
  const contracts = await deployZoraCreatorERC1155Factory(admin.address)
  const createZoraCreator1155Address = await createZoraCreator1155(
    contracts.zoraCreatorERC1155Factory,
    admin.address,
    fundRecipientAddress
  )
  const ZoraCreator1155 = await ethers.getContractAt(
    'ZoraCreator1155Impl',
    createZoraCreator1155Address!
  )

  // Deploy Gasha
  const gashaContract = await deployGashaContract(
    admin.address,
    createZoraCreator1155Address!,
    await contracts.merkelMinter.getAddress(),
    fundRecipientAddress,
    0.000777
  )

  // Setup Tokens
  for (const tokenId of [1, 2, 3]) {
    let tx = await ZoraCreator1155.setupNewTokenWithCreateReferral(
      `ipfs://QmQM3UFhUVocoKgVrdvXf1UxtYyGVnNnnrZYkePknv6R63/${tokenId}.json`,
      100000,
      fundRecipientAddress
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
      fundRecipientAddress,
      tokenId
    )
    tree = merkleTree
  }

  await setMinterArguments(gashaContract, tree)

  // Add Gasha series
  let tx = await gashaContract.setNewSeriesItem(1, 0, 800)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(1)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(2, 1, 150)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(2)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(3, 2, 50)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(3)
  await tx.wait()

  // Set available time
  tx = await gashaContract.setAvailableTime(0, 1893456000)
  await tx.wait()

  console.log(tx)

  console.log(
    'ZoraCreator1155 deployed to:',
    await ZoraCreator1155.getAddress()
  )
  console.log('Gasha deployed to:', await gashaContract.getAddress())

  return
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
