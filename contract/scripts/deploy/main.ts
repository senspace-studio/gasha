import { deployGashaContract } from "../helper/gasha"
import { deployGashaItemContract } from "../helper/nft"
import { deployForwarderContract, deployHatContract } from "../helper/hat"

const main = async () => {
  const adminAddress = "0x807C69F16456F92ab2bFc9De8f14AF31051f9678"
  const syndicateAddress = "0x6A835d6bd3d5fE1D1Ac8dB2Ce2f707f95892Ea28"

  const gashaItemERC1155Contract = await deployGashaItemContract(adminAddress)

  const hatContract = await deployHatContract(adminAddress)

  const gashaContract = await deployGashaContract(
    adminAddress,
    await gashaItemERC1155Contract.getAddress(),
    await hatContract.getAddress(),
    0
  )

  const forwarderContract = await deployForwarderContract(
    adminAddress,
    await hatContract.getAddress(),
    "0x1E81450b1b7c550708b659cA6AF6fADeA3c4B4A4"
  )

  for (const tokenId of [1, 2, 3]) {
    let tx = await gashaItemERC1155Contract.setupNewToken(`${tokenId}.json`)
    await tx.wait()
  }

  // Add Gasha series
  let tx = await gashaContract.setNewSeriesItem(1, 0, 600)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(2, 1, 300)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(3, 2, 100)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(1)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(2)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(3)
  await tx.wait()

  // Set syndicate as Operator of Gasha
  tx = await gashaContract.setOperator(syndicateAddress, true)

  // Set available time for gasha
  tx = await gashaContract.setAvailableTime(1711000000, 1912300400)

  // Set minter of GashaItem
  tx = await gashaItemERC1155Contract.setMinter(
    await gashaContract.getAddress(),
    true
  )
  await tx.wait()
  tx = await gashaItemERC1155Contract.setBaseURI(
    "ipfs://QmejLqmKQny5XJNhuKf7Q3Net1aJauu2JC8DwnL4DH65ZN/"
  )
  await tx.wait()

  // Set syndicate as operator of Forwarder
  tx = await forwarderContract.setOperator(syndicateAddress, true)

  // set forwarder of hat
  tx = await hatContract.setForwarder(await gashaContract.getAddress(), true)
  await tx.wait()
  tx = await hatContract.setForwarder(
    await forwarderContract.getAddress(),
    true
  )
  await tx.wait()

  console.log(
    "ZoraCreator1155 deployed to:",
    await gashaItemERC1155Contract.getAddress()
  )
  console.log("Gasha deployed to:", await gashaContract.getAddress())
  console.log("Hat deployed to:", await hatContract.getAddress())
  console.log("Forwarder deployed to:", await forwarderContract.getAddress())

  return
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
