import { useAccount, useConfig } from "wagmi"
import { useReadERC20Contract, useWriteERC20Contract } from "./useContract"
import { ERC20_MINTER_ADDRESS } from "@/config"
import { useCallback, useEffect, useState } from "react"
import { getTransactionReceipt } from "@wagmi/core"
import { toast } from "react-toastify"
import { TransactionReceipt } from "viem"
import { captureException } from "@sentry/nextjs"
import { useSwitchChain } from "./useChain"

export const useAllowance = () => {
  const { address, chainId } = useAccount()
  const { handleSwitchChain, switched } = useSwitchChain()
  const config = useConfig()
  const [receipt, setReceipt] = useState<TransactionReceipt>()

  const { data: allowance, refetch } = useReadERC20Contract("allowance", [
    address!,
    ERC20_MINTER_ADDRESS,
  ])

  const {
    sendTx,
    data: txHash,
    reset,
    isPending,
    isSuccess,
  } = useWriteERC20Contract("approve")

  useEffect(() => {
    const fetchReceipt = setInterval(async () => {
      if (txHash) {
        try {
          const _receipt = await getTransactionReceipt(config, { hash: txHash })
          if (_receipt.status === "reverted") {
            toast.error("Transaction reverted. Please try again.")
            reset()
            clearInterval(fetchReceipt)
          } else if (_receipt?.logs.length > 0) {
            setReceipt(_receipt)
            clearInterval(fetchReceipt)
          }
        } catch (err) {}
      }
    }, 1000)

    return () => clearInterval(fetchReceipt)
  }, [txHash])

  const approve = useCallback(
    async (amount: bigint) => {
      if (!address) {
        toast.error("Please connect your wallet")
        return
      }

      if (chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID) || switched) {
        try {
          await sendTx([ERC20_MINTER_ADDRESS, amount])
        } catch (error: any) {
          if (error.message.includes("insufficient funds")) {
            toast.error("Insufficient funds. Base ETH is required to spin.")
          } else {
            captureException(error)
            console.log(error)
            toast.error("Failed to spin the gasha")
          }
        }
      } else {
        handleSwitchChain()
      }
    },
    [sendTx]
  )

  return {
    allowance,
    approve,
    receipt,
    isPending,
    isSuccess,
    refetch,
  }
}
