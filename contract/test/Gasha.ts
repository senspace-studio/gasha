import { expect } from "chai"
import {
  ERC20,
  ERC20Minter,
  ERC20Test,
  Gasha,
  ProtocolRewards,
  ZoraCreator1155FactoryImpl,
  ZoraCreator1155Impl,
} from "../typechain-types"
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { formatEther, MaxUint256, parseEther } from "ethers"
import {
  addPermission,
  callSaleForERC20Minter,
  createZoraCreator1155,
  deployERC20Minter,
  deployGashaContract,
  deployZoraCreatorERC1155Factory,
} from "./helper"

describe("Gasha", () => {
  let Gasha: Gasha
  let ZoraCreator1155Factory: ZoraCreator1155FactoryImpl
  let ZoraCreator1155: ZoraCreator1155Impl
  let ERC20Token: ERC20Test
  let ERC20Minter: ERC20Minter
  let ZoraProtocolRewards: ProtocolRewards
  let admin: SignerWithAddress
  let fundRecipient: SignerWithAddress
  let user: SignerWithAddress

  before(async () => {
    ;[admin, fundRecipient, user] = await ethers.getSigners()

    const contracts = await deployZoraCreatorERC1155Factory(admin.address)
    ZoraCreator1155Factory = contracts.zoraCreatorERC1155Factory
    ZoraProtocolRewards = contracts.zoraProtocolRewards

    ERC20Token = await (await ethers.getContractFactory("ERC20Test")).deploy()
    await ERC20Token.waitForDeployment()
    ERC20Minter = await deployERC20Minter(fundRecipient.address)

    const address = await createZoraCreator1155(
      ZoraCreator1155Factory,
      admin.address,
      fundRecipient.address,
      "https://zora.co"
    )
    ZoraCreator1155 = await ethers.getContractAt(
      "ZoraCreator1155Impl",
      address!
    )

    Gasha = await deployGashaContract(
      admin.address,
      await ZoraCreator1155.getAddress(),
      await ERC20Token.getAddress(),
      fundRecipient.address,
      await ERC20Minter.getAddress(),
      100
    )

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
        await ERC20Minter.getAddress()
      )
      await callSaleForERC20Minter(
        ZoraCreator1155,
        await ERC20Minter.getAddress(),
        parseEther("100"),
        fundRecipient.address,
        await ERC20Token.getAddress(),
        tokenId
      )
    }

    ERC20Token.mint(user.address, parseEther("10000"))
  })

  it("should add series item", async () => {
    let tx = await Gasha.setNewSeriesItem(1, 0, 800)
    await tx.wait()
    tx = await Gasha.activateSeriesItem(1)
    await tx.wait()

    tx = await Gasha.setNewSeriesItem(2, 1, 150)
    await tx.wait()
    tx = await Gasha.activateSeriesItem(2)
    await tx.wait()

    tx = await Gasha.setNewSeriesItem(3, 2, 50)
    await tx.wait()
    tx = await Gasha.activateSeriesItem(3)
    await tx.wait()

    const seriesItem = await Gasha.series(0)
    expect(seriesItem.tokenId).to.equal(1)
    expect(seriesItem.rareness).to.equal(0)
    expect(seriesItem.weight).to.equal(800)
  })

  it("should revert when not available time", async () => {
    await expect(
      Gasha.setAvailableTime(0, Math.ceil(new Date().getTime() / 1000) - 1e6)
    ).emit(Gasha, "SetAvailableTime")
    await expect(Gasha.spin(1)).to.be.revertedWith("Gasha: not available now")
  })

  it("should set available time", async () => {
    await expect(Gasha.setAvailableTime(0, 1893456000)).emit(
      Gasha,
      "SetAvailableTime"
    )
  })

  it("should revert when not trusted forwarder", async () => {
    await expect(Gasha.spin(1)).to.be.revertedWith(
      "ERC20Minter: caller is not a trusted forwarder"
    )

    await ERC20Minter.setTrustedForwarder(await Gasha.getAddress(), true)
  })

  it("should revert when not approved", async () => {
    await expect(Gasha.connect(user).spin(1)).to.be.revertedWith(
      "ERC20: insufficient allowance"
    )

    const tx = await ERC20Token.connect(user).approve(
      await ERC20Minter.getAddress(),
      MaxUint256
    )
    await tx.wait()
  })

  it("shoud spin", async () => {
    const beforeERC20Balance = await ERC20Token.balanceOf(user.address)
    console.log("beforeERC20Balance", formatEther(beforeERC20Balance))

    const amount = 5
    await expect(Gasha.connect(user).spin(amount)).emit(Gasha, "Spin")

    const afterERC20Balance = await ERC20Token.balanceOf(user.address)
    console.log("afterERC20Balance", formatEther(afterERC20Balance))
  })

  it("should get active items", async () => {
    const activeItems = await Gasha.activeSeriesItems()
    expect(activeItems.length).to.equal(3)
    expect(activeItems[0].tokenId).to.equal(1)
    expect(activeItems[0].rareness).to.equal(0)
    expect(activeItems[0].weight).to.equal(800)
  })

  it("should deactivate series item", async () => {
    await Gasha.deactivateSeriesItem(1)
    const activeItems = await Gasha.activeSeriesItems()
    expect(activeItems.length).to.equal(2)
    expect(activeItems[0].tokenId).to.equal(2)
    expect(activeItems[0].rareness).to.equal(1)
    expect(activeItems[0].weight).to.equal(150)
  })

  it("should activate series item", async () => {
    await Gasha.activateSeriesItem(1)
    const activeItems = await Gasha.activeSeriesItems()
    expect(activeItems.length).to.equal(3)
    expect(activeItems[0].tokenId).to.equal(1)
    expect(activeItems[0].rareness).to.equal(0)
    expect(activeItems[0].weight).to.equal(800)
  })

  // it("should drop by owner", async () => {
  //   await Gasha.dropByOwner(fundRecipient.address, [1], [1], {
  //     value: parseEther("0.000777"),
  //   })
  // })
})
