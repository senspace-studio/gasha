import { ethers } from 'hardhat'
import {
  ZoraCreator1155FactoryImpl,
  ZoraCreator1155Impl,
  ZoraCreatorMerkleMinterStrategy__factory,
} from '../../typechain-types'
import { keccak256, maxUint64, zeroAddress } from 'viem'
import { AbiCoder } from 'ethers'
import MerkleTree from 'merkletreejs'

export const deployZoraCreatorERC1155Factory = async () => {
  const [admin] = await ethers.getSigners()

  const zoraProtocolRewardsFactory = await ethers.getContractFactory(
    'ProtocolRewards'
  )
  const zoraProtocolRewards = await zoraProtocolRewardsFactory.deploy()
  await zoraProtocolRewards.waitForDeployment()

  const zoraCreator1155AttributionFactory = await ethers.getContractFactory(
    'DelegatedTokenCreation'
  )
  const zoraCreator1155Attribution =
    await zoraCreator1155AttributionFactory.deploy()
  await zoraCreator1155Attribution.waitForDeployment()

  const zoraCreator1155ImplFactory = await ethers.getContractFactory(
    'ZoraCreator1155Impl',
    {
      libraries: {
        DelegatedTokenCreation: await zoraCreator1155Attribution.getAddress(),
      },
    }
  )
  const zoraCreator1155Impl = await zoraCreator1155ImplFactory.deploy(
    admin.address,
    admin.address,
    await zoraProtocolRewards.getAddress()
  )
  await zoraCreator1155Impl.waitForDeployment()

  const merkelMinterFactory = await ethers.getContractFactory(
    'ZoraCreatorMerkleMinterStrategy'
  )
  const merkelMinter = await merkelMinterFactory.deploy()
  await merkelMinter.waitForDeployment()

  const fixedPriceMinterFactory = await ethers.getContractFactory(
    'ZoraCreatorFixedPriceSaleStrategy'
  )
  const fixedPriceMinter = await fixedPriceMinterFactory.deploy()
  await fixedPriceMinter.waitForDeployment()

  const redeemMinterFactory = await ethers.getContractFactory(
    'ZoraCreatorRedeemMinterFactory'
  )
  const redeemMinter = await redeemMinterFactory.deploy()
  await redeemMinter.waitForDeployment()

  const factory = await ethers.getContractFactory('ZoraCreator1155FactoryImpl')
  const zoraCreatorERC1155Factory = await factory.deploy(
    await zoraCreator1155Impl.getAddress(),
    await merkelMinter.getAddress(),
    await fixedPriceMinter.getAddress(),
    await redeemMinter.getAddress()
  )

  await zoraCreatorERC1155Factory.waitForDeployment()

  return {
    zoraCreatorERC1155Factory,
    merkelMinter,
    fixedPriceMinter,
    redeemMinter,
    zoraProtocolRewards,
  }
}

export const createZoraCreator1155 = async (
  factory: ZoraCreator1155FactoryImpl,
  admin: string,
  rewardsRecipient: string
) => {
  const tx = await factory.createContract(
    'https://zora.co/1',
    'collection name',
    {
      royaltyMintSchedule: 0,
      royaltyBPS: 0,
      royaltyRecipient: rewardsRecipient,
    },
    admin,
    []
  )
  const recipt = await tx.wait()

  // check tx emit event Created with tx hash
  const events = await factory.queryFilter(factory.filters.SetupNewContract)
  const contractAddress = events.find((e) => e.transactionHash === recipt?.hash)
    ?.args[0]

  return contractAddress
}

export const addPermission = async (
  zoraCreator1155: ZoraCreator1155Impl,
  tokenId: number,
  targetContract: string
) => {
  const tx = await zoraCreator1155.addPermission(
    tokenId,
    targetContract,
    2 ** 2
  )
  await tx.wait()

  return
}

export const callSaleForMerkleMinter = async (
  zoraCreator1155: ZoraCreator1155Impl,
  minterAddress: string,
  leaves: [string, number, number][],
  fundsRecipientAddress: string,
  tokenId: number
) => {
  const hashedLeaves = leaves.map((v) =>
    keccak256(
      new AbiCoder().encode(
        ['address', 'uint256', 'uint256'],
        v
      ) as `0x${string}`
    )
  )
  const merkleTree = new MerkleTree(hashedLeaves, keccak256, {
    sortPairs: true,
  })

  const values = [
    tokenId,
    {
      presaleStart: 0,
      presaleEnd: maxUint64,
      fundsRecipient: fundsRecipientAddress,
      merkleRoot: merkleTree.getHexRoot(),
    },
  ] as any

  const setSaleData =
    ZoraCreatorMerkleMinterStrategy__factory.createInterface().encodeFunctionData(
      'setSale' as any,
      values
    )

  const tx = await zoraCreator1155.callSale(tokenId, minterAddress, setSaleData)
  await tx.wait()

  return { merkleTree }
}
