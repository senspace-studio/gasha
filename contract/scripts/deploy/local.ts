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

async function main() {
  const [admin] = await ethers.getSigners()
  const fundRecipientAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

  // Deploy Zora Families
  const contracts = await deployZoraCreatorERC1155Factory(admin.address)
  const createZoraCreator1155Address = await createZoraCreator1155(
    contracts.zoraCreatorERC1155Factory,
    admin.address,
    fundRecipientAddress,
    "ipfs://QmWdGS5HgfGjbXX851xzCd2f5WFnNxK4NjpmDnUCiY8EXz"
  )
  const ZoraCreator1155 = await ethers.getContractAt(
    "ZoraCreator1155Impl",
    createZoraCreator1155Address!
  )

  const ERC20Token = await (
    await ethers.getContractFactory("ERC20Test")
  ).deploy()
  await ERC20Token.waitForDeployment()
  const ERC20Minter = await deployERC20Minter(fundRecipientAddress)

  // Deploy Gasha
  const gashaContract = await deployGashaContract(
    admin.address,
    createZoraCreator1155Address!,
    await ERC20Token.getAddress(),
    fundRecipientAddress,
    await ERC20Minter.getAddress(),
    100
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
      await ERC20Minter.getAddress()
    )
    await callSaleForERC20Minter(
      ZoraCreator1155,
      await ERC20Minter.getAddress(),
      parseEther("100"),
      fundRecipientAddress,
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

  tx = await ERC20Token.mint(admin.address, parseEther("1000000"))
  await tx.wait()
  tx = await ERC20Token.approve(
    await ERC20Minter.getAddress(),
    parseEther("1000000")
  )

  console.log("ERC20 test deployed to:", await ERC20Token.getAddress())
  console.log(
    "ZoraCreator1155 deployed to:",
    await ZoraCreator1155.getAddress()
  )
  console.log("Gasha deployed to:", await gashaContract.getAddress())

  return
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
