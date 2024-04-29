import { ERC20ABI } from "@/abi/erc20"
import { GashaAbi } from "@/abi/gasha"
import { ZoraProtocolRewardsAbi } from "@/abi/protocolRewards"
import { ZoraCreator1155Abi } from "@/abi/zoraCreator1155"
import {
  ERC20_ADDRESS,
  GASHA_ADDRESS,
  ZORA_CREATOR_ERC1155_ADDRESS,
  ZORA_PROTOCOL_REWARDS_ADDRESS,
} from "@/config"
import {
  ERC20ReadArgs,
  ERC20ReadFunctionName,
  ERC20ReadFunctionReturnType,
  ERC20WriteFunctionName,
  ERC20WriteParams,
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
} from "@/contract"
import { useCallback } from "react"
import { useReadContract, useReadContracts, useWriteContract } from "wagmi"

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
    async (args: GashaWriteParams<T>["args"], value?: bigint) => {
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

export const useReadERC20Contract = <T extends ERC20ReadFunctionName>(
  functionName: T,
  args: ERC20ReadArgs<T> extends readonly [] | undefined ? [] : ERC20ReadArgs<T>
) => {
  const readResult = useReadContract({
    abi: ERC20ABI,
    address: ERC20_ADDRESS,
    functionName: functionName,
    args: args,
  } as any)

  return readResult as ERC20ReadFunctionReturnType<T>
}

export const useWriteERC20Contract = <T extends ERC20WriteFunctionName>(
  functionName: T
) => {
  const writeResult = useWriteContract()

  const sendTx = useCallback(
    async (args: ERC20WriteParams<T>["args"], value?: bigint) => {
      try {
        return await writeResult.writeContractAsync({
          abi: ERC20ABI,
          address: ERC20_ADDRESS,
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
