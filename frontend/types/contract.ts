import { GashaAbi } from "@/abi/gasha"
import { ZoraCreator1155Abi } from "@/abi/zoraCreator1155"
import { ZoraProtocolRewardsAbi } from "@/abi/protocolRewards"
import { ContractFunctionArgs, ContractFunctionName } from "viem"
import { UseReadContractReturnType } from "wagmi"
import { ReadContractParameters, WriteContractParameters } from "wagmi/actions"
import { ERC20ABI } from "@/abi/erc20"

type GashaReadFunctionName = ContractFunctionName<
  typeof GashaAbi,
  "pure" | "view"
>

type GashaReadArgs = ContractFunctionArgs<
  typeof GashaAbi,
  "pure" | "view",
  GashaReadFunctionName
>

type GashaWriteFunctionName = ContractFunctionName<
  typeof GashaAbi,
  "nonpayable" | "payable"
>

type GashaWriteParams<T extends GashaWriteFunctionName> =
  WriteContractParameters<typeof GashaAbi, T>

type ZoraCreatorERC1155ReadFunctionName = ContractFunctionName<
  typeof ZoraCreator1155Abi,
  "pure" | "view"
>

type ZoraCreatorERC1155ReadArgs<T extends ZoraCreatorERC1155ReadFunctionName> =
  ContractFunctionArgs<typeof ZoraCreator1155Abi, "pure" | "view", T>

type ZoraCreator1155ReadFunctionReturnType<
  T extends ZoraCreatorERC1155ReadFunctionName
> = UseReadContractReturnType<typeof ZoraCreator1155Abi, T>

type ZoraProtocolRewardsReadFunctionName = ContractFunctionName<
  typeof ZoraProtocolRewardsAbi,
  "pure" | "view"
>

type ZoraProtocolRewardsReadArgs = ContractFunctionArgs<
  typeof ZoraProtocolRewardsAbi,
  "pure" | "view",
  ZoraProtocolRewardsReadFunctionName
>

type ZoraProtocolRewardsFunctionReturnType<
  T extends ZoraProtocolRewardsReadFunctionName
> = UseReadContractReturnType<typeof ZoraProtocolRewardsAbi, T>

type ERC20ReadFunctionName = ContractFunctionName<
  typeof ERC20ABI,
  "pure" | "view"
>

type ERC20ReadArgs<T extends ERC20ReadFunctionName> = ContractFunctionArgs<
  typeof ERC20ABI,
  "pure" | "view",
  T
>

type ERC20ReadFunctionReturnType<T extends ERC20ReadFunctionName> =
  UseReadContractReturnType<typeof ERC20ABI, T>

type ERC20WriteFunctionName = ContractFunctionName<
  typeof ERC20ABI,
  "nonpayable" | "payable"
>

type ERC20WriteParams<T extends ERC20WriteFunctionName> =
  WriteContractParameters<typeof ERC20ABI, T>

export type {
  GashaReadFunctionName,
  GashaReadArgs,
  GashaWriteFunctionName,
  GashaWriteParams,
  ZoraCreatorERC1155ReadFunctionName,
  ZoraCreatorERC1155ReadArgs,
  ZoraCreator1155ReadFunctionReturnType,
  ZoraProtocolRewardsReadFunctionName,
  ZoraProtocolRewardsReadArgs,
  ZoraProtocolRewardsFunctionReturnType,
  ERC20ReadFunctionName,
  ERC20ReadArgs,
  ERC20ReadFunctionReturnType,
  ERC20WriteFunctionName,
  ERC20WriteParams,
}
