import { ethers } from "hardhat"
import {
  addPermission,
  callSaleForERC20Minter,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployERC20Minter,
  deployZoraCreatorERC1155Factory,
  generateMerkleTree,
} from "../helper/zora"
import { deployGashaContract } from "../helper/gasha"
import { parseEther, zeroAddress } from "viem"

const main = async () => {
  const adminAddress = "0x807C69F16456F92ab2bFc9De8f14AF31051f9678"
  const poolWalletAddress = "0xdCb93093424447bF4FE9Df869750950922F1E30B"
  const senspaceWalletAddress = "0x777EE5eeEd30c3712bEE6C83260D786857d9C556"
  const _747WalletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

  // const contracts = await deployZoraCreatorERC1155Factory(adminAddress)

  // const zoraCreator1155Factory = await ethers.getContractAt(
  //   "ZoraCreator1155FactoryImpl",
  //   await contracts.zoraCreatorERC1155Factory.getAddress()
  // )

  const zoraCreator1155Factory = await ethers.getContractAt(
    "ZoraCreator1155FactoryImpl",
    "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021"
  )

  const zoraCreator1155Address = await createZoraCreator1155(
    zoraCreator1155Factory,
    adminAddress,
    poolWalletAddress,
    "ipfs://QmWdGS5HgfGjbXX851xzCd2f5WFnNxK4NjpmDnUCiY8EXz"
  )

  const ZoraCreator1155 = await ethers.getContractAt(
    "ZoraCreator1155Impl",
    zoraCreator1155Address!
  )

  const ERC20Token = await (
    await ethers.getContractFactory("ERC20Test")
  ).deploy()
  await ERC20Token.waitForDeployment()
  const ERC20Minter = await deployERC20Minter(poolWalletAddress)

  const gashaContract = await deployGashaContract(
    adminAddress,
    zoraCreator1155Address!,
    await ERC20Token.getAddress(),
    senspaceWalletAddress,
    await ERC20Minter.getAddress(),
    74747
  )

  for (const tokenId of [1, 2, 3]) {
    let tx = await ZoraCreator1155.setupNewTokenWithCreateReferral(
      `ipfs://QmQM3UFhUVocoKgVrdvXf1UxtYyGVnNnnrZYkePknv6R63/${tokenId}.json`,
      100000,
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
      parseEther("74747"),
      poolWalletAddress,
      await ERC20Token.getAddress(),
      tokenId
    )
  }

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

  // Set trusted forwarder
  tx = await ERC20Minter.setTrustedForwarder(
    await gashaContract.getAddress(),
    true
  )
  await tx.wait()

  tx = await ERC20Token.mint(adminAddress, parseEther("1000000"))
  await tx.wait()
  tx = await ERC20Token.approve(
    await ERC20Minter.getAddress(),
    parseEther("1000000")
  )

  console.log("ERC20 test deployed to:", await ERC20Token.getAddress())
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
