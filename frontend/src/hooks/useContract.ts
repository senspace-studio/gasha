import { GashaAbi } from '@/abi/gasha'
import { ZoraProtocolRewardsAbi } from '@/abi/protocolRewards'
import { ZoraCreator1155Abi } from '@/abi/zoraCreator1155'
import {
  GASHA_ADDRESS,
  ZORA_CREATOR_ERC1155_ADDRESS,
  ZORA_PROTOCOL_REWARDS_ADDRESS,
} from '@/config'
import {
  GashaReadArgs,
  GashaReadFunctionName,
  GashaWriteFunctionName,
  GashaWriteParams,
  ZoraCreator1155ReadFunctionReturnType,
  ZoraCreatorERC1155ReadArgs,
  ZoraCreatorERC1155ReadFunctionName,
  ZoraProtocolRewardsFunctionReturnType,
  ZoraProtocolRewardsReadArgs,
  ZoraProtocolRewardsReadFunctionName,
} from '@/contract'
import { useCallback } from 'react'
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'

export const useMultiReadGashaContract = (
  params: {
    functionName: GashaReadFunctionName
    args: GashaReadArgs
  }[]
) => {
  const readResult = useReadContracts({
    contracts: params.map((param) => ({
      abi: GashaAbi,
      address: GASHA_ADDRESS,
      functionName: param.functionName,
      args: param.args,
    })),
  })

  return readResult
}

export const useWriteGashaContract = <T extends GashaWriteFunctionName>(
  functionName: T
) => {
  const writeResult = useWriteContract()

  const sendTx = useCallback(
    async (args: GashaWriteParams<T>['args'], value?: bigint) => {
      try {
        return await writeResult.writeContractAsync({
          abi: GashaAbi,
          address: GASHA_ADDRESS,
          functionName,
          args,
          value,
        } as any)
      } catch (error: any) {
        console.error(error)
        throw Error(error.message)
      }
    },
    [writeResult]
  )

  return { sendTx, ...writeResult }
}

export const useReadZoraCreator1155Contract = <
  T extends ZoraCreatorERC1155ReadFunctionName
>(
  functionName: T,
  ...args: ZoraCreatorERC1155ReadArgs<T> extends readonly [] | undefined
    ? []
    : [ZoraCreatorERC1155ReadArgs<T>]
) => {
  const readResult = useReadContract({
    abi: ZoraCreator1155Abi,
    address: ZORA_CREATOR_ERC1155_ADDRESS,
    functionName: functionName,
    args: args,
  } as any)

  return readResult as ZoraCreator1155ReadFunctionReturnType<T>
}

export const useMultiReadZoraCreator1155Contract = (
  params: {
    functionName: ZoraCreatorERC1155ReadFunctionName
    args: ZoraCreatorERC1155ReadArgs<ZoraCreatorERC1155ReadFunctionName>
  }[]
) => {
  const readResult = useReadContracts({
    contracts: params.map((param) => ({
      abi: ZoraCreator1155Abi,
      address: ZORA_CREATOR_ERC1155_ADDRESS,
      functionName: param.functionName,
      args: param.args,
    })),
  })

  return readResult
}

export const useMultiReadProtocolRewardsContract = (
  params: {
    functionName: ZoraProtocolRewardsReadFunctionName
    args: ZoraProtocolRewardsReadArgs
  }[]
) => {
  const readResult = useReadContracts({
    contracts: params.map((param) => ({
      abi: ZoraProtocolRewardsAbi,
      address: ZORA_PROTOCOL_REWARDS_ADDRESS,
      functionName: param.functionName,
      args: param.args,
    })),
  })

  return readResult
}
