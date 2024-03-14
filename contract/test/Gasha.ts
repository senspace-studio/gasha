import { expect } from 'chai'
import {
  Gasha,
  ProtocolRewards,
  ZoraCreator1155FactoryImpl,
  ZoraCreator1155Impl,
  ZoraCreatorMerkleMinterStrategy,
} from '../typechain-types'
import { zeroAddress } from 'viem'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { AbiCoder, keccak256, parseEther } from 'ethers'
import MerkleTree from 'merkletreejs'
import {
  addPermission,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployGashaContract,
  deployZoraCreatorERC1155Factory,
  setMinterArguments,
} from './helper'
import { Console } from 'console'

describe('Gasha', () => {
  let Gasha: Gasha
  let ZoraCreator1155Factory: ZoraCreator1155FactoryImpl
  let ZoraCreator1155: ZoraCreator1155Impl
  let MerkelMinter: ZoraCreatorMerkleMinterStrategy
  let ZoraProtocolRewards: ProtocolRewards
  let admin: SignerWithAddress
  let fundRecipient: SignerWithAddress
  let tree: MerkleTree
  let leaves: [string, number, number][]

  before(async () => {
    ;[admin, fundRecipient] = await ethers.getSigners()

    const contracts = await deployZoraCreatorERC1155Factory()
    ZoraCreator1155Factory = contracts.zoraCreatorERC1155Factory
    MerkelMinter = contracts.merkelMinter
    ZoraProtocolRewards = contracts.zoraProtocolRewards

    const address = await createZoraCreator1155(
      ZoraCreator1155Factory,
      admin.address,
      fundRecipient.address
    )
    ZoraCreator1155 = await ethers.getContractAt(
      'ZoraCreator1155Impl',
      address!
    )

    Gasha = await deployGashaContract(
      await ZoraCreator1155.getAddress(),
      await MerkelMinter.getAddress(),
      fundRecipient.address
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
        await MerkelMinter.getAddress()
      )
    }

    leaves = [
      [zeroAddress, 0, 0],
      [await Gasha.getAddress(), 100000, 0],
    ]

    for (const tokenId of [1, 2, 3]) {
      const { merkleTree } = await callSaleForMerkleMinter(
        ZoraCreator1155,
        await MerkelMinter.getAddress(),
        leaves,
        fundRecipient.address,
        tokenId
      )
      tree = merkleTree
    }

    await setMinterArguments(Gasha, tree)
  })

  it('should add series item', async () => {
    let tx = await Gasha.setNewSeriesItem(1, 0, 800)
    await tx.wait()
    tx = await Gasha.setNewSeriesItem(2, 1, 150)
    await tx.wait()
    tx = await Gasha.setNewSeriesItem(3, 2, 50)
    await tx.wait()

    const seriesItem = await Gasha.series(0)
    expect(seriesItem.tokenId).to.equal(1)
    expect(seriesItem.rareness).to.equal(0)
    expect(seriesItem.weight).to.equal(800)
  })

  it('shoud spin', async () => {
    const amount = 100
    await expect(
      Gasha.spin(amount, {
        value: parseEther(String(0.000777 * amount)),
      })
    ).emit(Gasha, 'Spin')

    const balanceOfRewards = await ZoraProtocolRewards.balanceOf(
      fundRecipient.address
    )
    console.log(balanceOfRewards)
  })

  it('remove series item', async () => {
    const tx = await Gasha.removeSeriesItem(1)
    await tx.wait()

    const seriesItem = await Gasha.series(0)
    expect(seriesItem.tokenId).to.equal(2)
    expect(seriesItem.rareness).to.equal(1)
  })
})
