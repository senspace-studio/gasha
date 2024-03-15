import { GashaAbi } from '@/abi/gasha'
import { ZoraCreator1155Abi } from '@/abi/zoraCreator1155'
import { ContractFunctionArgs, ContractFunctionName } from 'viem'
import { UseReadContractReturnType } from 'wagmi'
import { ReadContractParameters, WriteContractParameters } from 'wagmi/actions'

type GashaReadFunctionName = ContractFunctionName<
  typeof GashaAbi,
  'pure' | 'view'
>

type GashaReadArgs = ContractFunctionArgs<
  typeof GashaAbi,
  'pure' | 'view',
  GashaReadFunctionName
>

type GashaWriteFunctionName = ContractFunctionName<
  typeof GashaAbi,
  'nonpayable' | 'payable'
>

type GashaWriteParams<T extends GashaWriteFunctionName> =
  WriteContractParameters<typeof GashaAbi, T>

type ZoraCreatorERC1155ReadFunctionName = ContractFunctionName<
  typeof ZoraCreator1155Abi,
  'pure' | 'view'
>

type ZoraCreatorERC1155ReadArgs<T extends ZoraCreatorERC1155ReadFunctionName> =
  ContractFunctionArgs<typeof ZoraCreator1155Abi, 'pure' | 'view', T>

type ZoraCreator1155ReadFunctionReturnType<
  T extends ZoraCreatorERC1155ReadFunctionName
> = UseReadContractReturnType<typeof ZoraCreator1155Abi, T>

export type {
  GashaReadFunctionName,
  GashaReadArgs,
  GashaWriteFunctionName,
  GashaWriteParams,
  ZoraCreatorERC1155ReadFunctionName,
  ZoraCreatorERC1155ReadArgs,
  ZoraCreator1155ReadFunctionReturnType,
}
