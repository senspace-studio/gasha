import { useCallback, useEffect, useMemo, useState } from "react"
import {
  useMultiReadGashaContract,
  useMultiReadZoraCreator1155Contract,
  useReadERC20Contract,
  useWriteGashaContract,
} from "./useContract"
import {
  TransactionReceipt,
  formatEther,
  parseEther,
  parseEventLogs,
} from "viem"
import { getTransactionReceipt } from "@wagmi/core"
import { GashaAbi } from "@/abi/gasha"
import { useAccount, useConfig } from "wagmi"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { ipfs2http } from "@/lib/ipfs2http"
import { gashaAPI, gashaAxios } from "@/lib/gashaAPI"
import { ResultItem, ResultPoint } from "@/gasha"
import { useSwitchChain } from "./useChain"
import { captureException } from "@sentry/nextjs"
import { useAllowance } from "./useERC20"
import { UNIT_PRICE } from "@/config"

enum RarenessLabel {
  Common = 0,
  Rare = 1,
  Special = 2,
}

export const rarenessLabel: Record<number, string> = {
  [RarenessLabel.Common]: "common",
  [RarenessLabel.Rare]: "rare",
  [RarenessLabel.Special]: "special",
}

export const useSpinGasha = () => {
  const {
    sendTx,
    isPending,
    data: txHash,
    reset,
  } = useWriteGashaContract<"spin">("spin")
  const config = useConfig()
  const [receipt, setReceipt] = useState<TransactionReceipt>()
  const { seriesItems } = useSeriesItems()
  const [points, setPoints] = useState<number>()
  const router = useRouter()
  const { address, chainId } = useAccount()
  const { handleSwitchChain, switched } = useSwitchChain()
  const { allowance } = useAllowance()

  const spinGasha = useCallback(
    async (quantity: number) => {
      if (!address) {
        toast.error("Please connect your wallet")
        return
      }

      if (
        !allowance ||
        Number(formatEther(allowance)) < quantity * UNIT_PRICE
      ) {
        toast.error("Please approve the contract to spend your Token")
        return
      }

      if (chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID) || switched) {
        try {
          await sendTx([BigInt(quantity)])
        } catch (error: any) {
          if (error.message.includes("transfer amount exceeds balance")) {
            toast.error("Insufficient funds. Token is required to spin.")
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
    [sendTx, chainId, address, switched, allowance]
  )

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

  const result = useMemo(() => {
    if (receipt && receipt.status === "success") {
      const topics = parseEventLogs({
        abi: GashaAbi,
        eventName: "Spin",
        logs: receipt.logs,
      })
      return topics[0]?.args.ids.map((id: bigint, index) => {
        const rareness: number =
          seriesItems?.find((i) => i.tokenId === Number(id))?.rareness || 0
        return {
          tokenId: Number(id),
          rareness: rareness,
          quantity: Number(topics[0].args.quantities[index]),
        }
      })
    }
  }, [receipt, seriesItems])

  useEffect(() => {
    if (result && txHash) {
      reset()
      router.push({
        pathname: `/result/${txHash}`,
        query: { result: JSON.stringify(result) },
      })
    }
  }, [result, txHash])

  return { spinGasha, isPending, result, points, txHash, reset }
}

export const useSeriesItems = () => {
  const readResult = useMultiReadGashaContract(
    new Array(10).fill("").map((_, i) => {
      return {
        functionName: "series",
        args: [BigInt(i)],
      }
    })
  )

  const seriesItems = useMemo(() => {
    return readResult.data
      ?.filter((item) => item.status === "success")
      .map((item) => {
        const result: [bigint, number, bigint] = item.result as any
        return {
          tokenId: Number(result[0]),
          rareness: result[1],
          weight: Number(result[2]),
        }
      })
  }, [readResult])

  return { seriesItems, ...readResult }
}

export const useResultData = () => {
  const router = useRouter()
  const { result } = router.query
  const { address } = useAccount()

  const [gotTokenIds, setGotTokenIds] = useState<number[]>([])
  const [gotItems, setGotItems] = useState<ResultItem[]>()
  const [gotPoints, setGotPoints] = useState<ResultPoint>()
  const [scorecardShareId, setScorecardShareId] = useState<number>()

  const { data } = useMultiReadZoraCreator1155Contract(
    gotTokenIds.map((id) => ({ functionName: "uri", args: [BigInt(id)] }))
  )

  const resultData = useMemo(() => {
    if (result) {
      return JSON.parse(result.toString()) as {
        tokenId: number
        rareness: number
        quantity: number
      }[]
    }
  }, [result])

  useEffect(() => {
    const fetchPoint = async () => {
      if (resultData && address) {
        try {
          const rareness = resultData.reduce(
            (acc, { rareness, quantity }) => {
              const label = rarenessLabel[rareness] as keyof typeof acc
              acc[label] += quantity
              return acc
            },
            { common: 0, rare: 0, special: 0 }
          )
          const query = Object.entries(rareness)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
          const points = await (
            await gashaAPI(`/points/${address}/result/?${query}`, {
              method: "GET",
            })
          ).json()
          setGotPoints(points)
          const { data } = await gashaAxios.post("/ogp/save-result", {
            address,
            result: resultData,
          })
          setScorecardShareId(data.id)
        } catch (error) {
          toast.error("Failed to calc points, please retry")
        }
      }
    }

    fetchPoint()
  }, [resultData, address])

  useEffect(() => {
    const fetchItem = async () => {
      if (!resultData) return
      setGotTokenIds(
        resultData
          .filter((d) => d.quantity > 0)
          .sort((a, b) => {
            return b.rareness - a.rareness
          })
          .map((d) => d.tokenId)
      )
    }

    fetchItem()
  }, [resultData])

  useEffect(() => {
    const fetchMetadata = async () => {
      if (data && resultData) {
        const promises = data.map(async (d, index) => {
          const tokenId = gotTokenIds[index]
          const metadata = await fetch(ipfs2http(d.result?.toString()!)).then(
            (res) => res.json()
          )
          return {
            ...metadata,
            tokenId,
            rareness:
              rarenessLabel[
                resultData?.find((r) => r.tokenId === tokenId)?.rareness || 0
              ],
            quantity:
              resultData?.find((r) => r.tokenId === tokenId)?.quantity || 0,
          }
        })
        const items = await Promise.all(promises)
        setGotItems(items)
      }
    }
    fetchMetadata()
  }, [data, resultData])

  return { gotItems, gotPoints, scorecardShareId }
}
