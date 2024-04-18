import { expect } from "chai"
import { Gasha, GashaItem, Hat } from "../typechain-types"
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { parseEther } from "ethers"
import { deployGashaContract, deployGashaItemContract } from "./helper"
import { deployHatContract } from "../scripts/helper/hat"

describe("Gasha", () => {
  let Gasha: Gasha
  let GashaItem: GashaItem
  let Hat: Hat
  let admin: SignerWithAddress
  let user: SignerWithAddress
  let operator: SignerWithAddress

  before(async () => {
    ;[admin, user, operator] = await ethers.getSigners()

    GashaItem = await deployGashaItemContract(admin.address)

    Hat = await deployHatContract(admin.address)

    Gasha = await deployGashaContract(
      admin.address,
      await GashaItem.getAddress(),
      await Hat.getAddress(),
      0.000777
    )

    for (const tokenId of [1, 2, 3]) {
      let tx = await GashaItem.setupNewToken(`https://zora.co/${tokenId}`)
      await tx.wait()
    }

    let tx = await GashaItem.setMinter(await Gasha.getAddress(), true)
    await tx.wait()
    tx = await Hat.setForwarder(await Gasha.getAddress(), true)
    await tx.wait()

    tx = await Gasha.setOperator(operator.address, true)
    await tx.wait()
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
    await expect(
      Gasha.connect(operator).spin(1, admin.address, {
        value: parseEther("0.000777"),
      })
    ).to.be.revertedWith("Gasha: not available now")
  })

  it("should set available time", async () => {
    await expect(Gasha.setAvailableTime(0, 1893456000)).emit(
      Gasha,
      "SetAvailableTime"
    )
  })

  it("shoud spin", async () => {
    let amount = 10
    await expect(
      Gasha.connect(operator).spin(amount, admin.address, {
        value: parseEther(String(0.000777 * amount)),
      })
    ).emit(Gasha, "Spin")

    amount = 999
    await expect(
      Gasha.connect(operator).spin(amount, user.address, {
        value: parseEther(String(0.000777 * amount)),
      })
    ).emit(Gasha, "Spin")
  })

  it("should fail to spin when not enough ether", async () => {
    await expect(
      Gasha.connect(operator).spin(1, admin.address, {
        value: parseEther("0.000776"),
      })
    ).to.be.revertedWith("Gasha: insufficient funds")
  })

  it("should fail to spin when not operator", async () => {
    await expect(
      Gasha.spin(1, admin.address, { value: parseEther("0.000777") })
    ).to.be.revertedWith("Gasha: caller is not the operator")
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

  it("should drop by owner", async () => {
    await Gasha.dropByOwner(user, [1], [1], {
      value: parseEther("0.000777"),
    })
  })
})
