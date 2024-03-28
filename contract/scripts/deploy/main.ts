import { ethers } from 'hardhat'
import {
  addPermission,
  callSaleForMerkleMinter,
  createZoraCreator1155,
} from '../helper/zora'
import { deployGashaContract, setMinterArguments } from '../helper/gasha'
import { zeroAddress } from 'viem'
import MerkleTree from 'merkletreejs'

const main = async () => {
  const adminAddress = '0x807C69F16456F92ab2bFc9De8f14AF31051f9678'
  const fundRecipientAddress = '0xdCb93093424447bF4FE9Df869750950922F1E30B'
  const merkelMinterAddress = '0xf48172CA3B6068B20eE4917Eb27b5472f1f272C7'

  const ipfsBaseURI = 'ipfs://QmeDd8wEEf6EPqeDSa1Kd5gpYHDA9VDU52GA6S85SuosiH'

  const ZoraERC1155FactoryAddress = '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021'

  const zoraCreator1155Factory = await ethers.getContractAt(
    'ZoraCreator1155FactoryImpl',
    ZoraERC1155FactoryAddress
  )

  const zoraCreator1155Address = await createZoraCreator1155(
    zoraCreator1155Factory,
    adminAddress,
    fundRecipientAddress,
    ipfsBaseURI
  )

  const ZoraCreator1155 = await ethers.getContractAt(
    'ZoraCreator1155Impl',
    zoraCreator1155Address!
  )

  const gashaContract = await deployGashaContract(
    adminAddress,
    zoraCreator1155Address!,
    merkelMinterAddress,
    fundRecipientAddress,
    0.000777
  )

  for (const tokenId of [1, 2, 3]) {
    let tx = await ZoraCreator1155.setupNewTokenWithCreateReferral(
      `${ipfsBaseURI}/${tokenId}.json`,
      10e8,
      fundRecipientAddress
    )
    await tx.wait()
    await addPermission(ZoraCreator1155, tokenId, merkelMinterAddress)
  }

  const leaves: [string, number, number][] = [
    [zeroAddress, 0, 0],
    [await gashaContract.getAddress(), 10e9, 0],
  ]

  let tree!: MerkleTree
  for (const tokenId of [1, 2, 3]) {
    const { merkleTree } = await callSaleForMerkleMinter(
      ZoraCreator1155,
      merkelMinterAddress,
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
  tx = await gashaContract.setNewSeriesItem(2, 1, 150)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(3, 2, 50)
  await tx.wait()

  console.log(
    'ZoraCreator1155 deployed to:',
    await ZoraCreator1155.getAddress()
  )
  console.log('Gasha deployed to:', await gashaContract.getAddress())

  return
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
