import { expect } from 'chai'
import {
  ZoraCreator1155FactoryImpl,
  ZoraCreator1155Impl,
  ZoraCreatorMerkleMinterStrategy,
} from '../typechain-types'
import {
  addPermission,
  callSaleForMerkleMinter,
  createZoraCreator1155,
  deployZoraCreatorERC1155Factory,
} from './helper/zora'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { AbiCoder, keccak256, parseEther } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import { zeroAddress } from 'viem'

describe('Zora', () => {
  let ZoraCreator1155Factory: ZoraCreator1155FactoryImpl
  let ZoraCreator1155: ZoraCreator1155Impl
  let MerkelMinter: ZoraCreatorMerkleMinterStrategy
  let admin: SignerWithAddress
  let funcRecipient: SignerWithAddress
  let minter: SignerWithAddress
  let tree: MerkleTree

  before(async () => {
    const contracts = await deployZoraCreatorERC1155Factory()
    ZoraCreator1155Factory = contracts.zoraCreatorERC1155Factory
    MerkelMinter = contracts.merkelMinter
    ;[admin, funcRecipient, minter] = await ethers.getSigners()
  })

  it('should deploy', async () => {
    expect(await ZoraCreator1155Factory.getAddress()).to.not.equal(0)
  })

  it('should create contract', async () => {
    const address = await createZoraCreator1155(ZoraCreator1155Factory)
    ZoraCreator1155 = await ethers.getContractAt(
      'ZoraCreator1155Impl',
      address!
    )

    expect(await ZoraCreator1155.name()).to.equal('collection name')
    const tx = await ZoraCreator1155.setupNewToken('https://zora.co/1', 100)
    await tx.wait()
  })

  it('callSale', async () => {
    await addPermission(ZoraCreator1155, 1, await MerkelMinter.getAddress())

    const { merkleTree } = await callSaleForMerkleMinter(
      ZoraCreator1155,
      await MerkelMinter.getAddress(),
      [
        [zeroAddress, 0, 0],
        [minter.address, 1000, 0],
      ],
      admin.address,
      1
    )

    tree = merkleTree
  })

  it('mint with merkle', async () => {
    const leafToVerify = keccak256(
      new AbiCoder().encode(
        ['address', 'uint256', 'uint256'],
        [minter.address, 1000, 0]
      )
    )
    const proof = tree.getHexProof(leafToVerify)

    const minterArguments = new AbiCoder().encode(
      ['address', 'uint256', 'uint256', 'bytes32[]'],
      [minter.address, 1000, 0, proof]
    )

    await ZoraCreator1155.mintWithRewards(
      await MerkelMinter.getAddress(),
      1,
      1,
      minterArguments,
      zeroAddress,
      {
        value: parseEther('0.000777'),
      }
    )

    const balance = await ZoraCreator1155.balanceOf(minter.address, 1)
    expect(balance).to.equal(1)
  })
})
