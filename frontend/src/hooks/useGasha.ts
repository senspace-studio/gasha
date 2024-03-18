import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMultiReadGashaContract, useWriteGashaContract } from './useContract'
import { TransactionReceipt, parseEther, parseEventLogs } from 'viem'
import { getTransactionReceipt } from '@wagmi/core'
import { GashaAbi } from '@/abi/gasha'
import { useConfig } from 'wagmi'
import { useRouter } from 'next/router'

enum RarenessLabel {
  Common = 0,
  Rare = 1,
  Special = 2,
}

const rarenessLabel: Record<number, string> = {
  [RarenessLabel.Common]: 'common',
  [RarenessLabel.Rare]: 'rare',
  [RarenessLabel.Special]: 'special',
}

export const useSpinGasha = () => {
  const {
    sendTx,
    isPending,
    data: txHash,
  } = useWriteGashaContract<'spin'>('spin')
  const config = useConfig()
  const [receipt, setReceipt] = useState<TransactionReceipt>()
  const { seriesItems } = useSeriesItems()
  const [points, setPoints] = useState<number>()
  const router = useRouter()

  const spinGasha = useCallback(
    async (quantity: number) => {
      await sendTx(
        [BigInt(quantity)],
        parseEther(
          String(quantity * Number(process.env.NEXT_PUBLIC_UNIT_PRICE))
        )
      )
    },
    [sendTx]
  )

  useEffect(() => {
    const fetchReceipt = setInterval(async () => {
      if (txHash) {
        const _receipt = await getTransactionReceipt(config, { hash: txHash })
        if (_receipt?.logs.length > 0) {
          setReceipt(_receipt)
          clearInterval(fetchReceipt)
        }
      }
    }, 1000)

    return () => clearInterval(fetchReceipt)
  }, [txHash])

  const result = useMemo(() => {
    if (receipt && receipt.status === 'success') {
      const topics = parseEventLogs({
        abi: GashaAbi,
        eventName: 'Spin',
        logs: receipt.logs,
      })
      return topics[0]?.args.ids.map((id: bigint, index) => {
        const rareness: number =
          seriesItems?.find((i) => i.tokenId === Number(id))?.rareness || 0
        return {
          tokenId: Number(id),
          rareness: rarenessLabel[rareness],
          quantity: Number(topics[0].args.quantities[index]),
        }
      })
    }
  }, [receipt, seriesItems])

  useEffect(() => {
    const calcPoints = async () => {
      if (result) {
        router.push({
          pathname: '/result',
          query: { result: JSON.stringify(result), points: 1000 },
        })
      }
    }
    calcPoints()
  }, [result])

  return { spinGasha, isPending, result, points }
}

export const useSeriesItems = () => {
  const readResult = useMultiReadGashaContract(
    new Array(10).fill('').map((_, i) => {
      return {
        functionName: 'series',
        args: [BigInt(i)],
      }
    })
  )

  const seriesItems = useMemo(() => {
    return readResult.data
      ?.filter((item) => item.status === 'success')
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
