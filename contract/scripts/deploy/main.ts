import { ethers } from "hardhat"
import {
  addPermission,
  callSaleForERC20Minter,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployERC20Minter,
  generateMerkleTree,
} from "../helper/zora"
import { deployGashaContract } from "../helper/gasha"
import { parseEther, zeroAddress } from "viem"

const main = async () => {
  const adminAddress = "0xb17e447d0Eb15c444789886F2bff6A4907140bC5"
  const poolWalletAddress = "0x0983a1a1dB6804ee94Db3F0029f0bd2F843C9441"
  const senspaceWalletAddress = "0xb17e447d0Eb15c444789886F2bff6A4907140bC5"
  const _747WalletAddress = "0x20a2d6c8cabb3179f42f26eb85fd9c98ac15983e"

  const ZoraERC1155FactoryAddress = "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021"

  const zoraCreator1155Factory = await ethers.getContractAt(
    "ZoraCreator1155FactoryImpl",
    ZoraERC1155FactoryAddress
  )

  const zoraCreator1155Address = await createZoraCreator1155(
    zoraCreator1155Factory,
    adminAddress,
    poolWalletAddress,
    "ipfs://QmPEC76Dg3Erz8Ja5oVCLs7QxDYnKeC16FrcmMiJWK9uDM"
  )

  if (!zoraCreator1155Address) {
    throw new Error("ZoraCreator1155 deployment failed")
  }

  const ZoraCreator1155 = await ethers.getContractAt(
    "ZoraCreator1155Impl",
    zoraCreator1155Address!
  )

  const ERC20Minter = await deployERC20Minter(poolWalletAddress)

  const gashaContract = await deployGashaContract(
    adminAddress,
    zoraCreator1155Address!,
    "0x621e87af48115122cd96209f820fe0445c2ea90e",
    senspaceWalletAddress,
    await ERC20Minter.getAddress(),
    174747
  )

  for (const tokenId of [1, 2, 3]) {
    let tx = await ZoraCreator1155.setupNewTokenWithCreateReferral(
      `ipfs://Qmc8frt5vFVs7mcctbWRCmvZpEBzLWKWqVpCp4mt81Fggx/${tokenId}.json`,
      10e8,
      _747WalletAddress
    )
    await tx.wait()
    await addPermission(
      ZoraCreator1155,
      tokenId,
      await ERC20Minter.getAddress()
    )
    await addPermission(
      ZoraCreator1155,
      tokenId,
      await gashaContract.getAddress()
    )
    await callSaleForERC20Minter(
      ZoraCreator1155,
      await ERC20Minter.getAddress(),
      parseEther("174747"),
      poolWalletAddress,
      "0x621e87af48115122cd96209f820fe0445c2ea90e",
      tokenId
    )
  }

  // Add Gasha series
  let tx = await gashaContract.setNewSeriesItem(1, 0, 600)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(1)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(2, 1, 300)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(2)
  await tx.wait()
  tx = await gashaContract.setNewSeriesItem(3, 2, 100)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(3)
  await tx.wait()

  tx = await gashaContract.setAvailableTime(0, 1893456000)
  await tx.wait()

  tx = await ERC20Minter.setTrustedForwarder(
    await gashaContract.getAddress(),
    true
  )
  await tx.wait()

  console.log("ERC20Minter deployed to:", await ERC20Minter.getAddress())
  console.log(
    "ZoraCreator1155 deployed to:",
    await ZoraCreator1155.getAddress()
  )
  console.log("Gasha deployed to:", await gashaContract.getAddress())

  return
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
