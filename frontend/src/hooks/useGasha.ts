import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMultiReadGashaContract, useWriteGashaContract } from './useContract'
import { parseEther, parseEventLogs } from 'viem'
import { useTransactionReceipt } from 'wagmi'
import { GashaAbi } from '@/abi/gasha'

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
  const { sendTx, isPending, data } = useWriteGashaContract<'spin'>('spin')
  const receipt = useTransactionReceipt({ hash: data })
  const { seriesItems } = useSeriesItems()
  const [points, setPoints] = useState<number>()

  const spinGasha = useCallback(
    async (quantity: number) => {
      const a = await sendTx(
        [BigInt(quantity)],
        parseEther(String(quantity * 0.000777))
      )
    },
    [sendTx]
  )

  const result = useMemo(() => {
    if (receipt && receipt.status === 'success') {
      const topics = parseEventLogs({
        abi: GashaAbi,
        eventName: 'Spin',
        logs: receipt.data.logs,
      })
      return topics[0].args.ids.map((id: bigint, index) => {
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
        setPoints(1000)
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
