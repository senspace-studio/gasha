import { GashaAbi } from '@/abi/gasha'
import { ZoraCreator1155Abi } from '@/abi/zoraCreator1155'
import {
  GashaReadArgs,
  GashaReadFunctionName,
  GashaWriteFunctionName,
  GashaWriteParams,
  ZoraCreator1155ReadFunctionReturnType,
  ZoraCreatorERC1155ReadArgs,
  ZoraCreatorERC1155ReadFunctionName,
} from '@/contract'
import { useCallback } from 'react'
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'

const GASHA_ADDRESS = process.env.NEXT_PUBLIC_GASHA_ADDRESS as `0x${string}`
const ZORA_CREATOR_ERC1155_ADDRESS = process.env
  .NEXT_PUBLIC_ZORA_CREATOR_ERC1155_ADDRESS as `0x${string}`

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
