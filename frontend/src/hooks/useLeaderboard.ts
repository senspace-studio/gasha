import { Leaderboard } from '@/gasha'
import { gashaAPI } from '@/lib/gashaAPI'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useLeaderboard = (page: number = 1) => {
  const [totalPoints, setTotalPoints] = useState(0)
  const [leaderboard, setLeaderboard] = useState<Leaderboard>()
  const [myPoints, setMyPoints] = useState<number>(0)

  const { address } = useAccount()

  useEffect(() => {
    const fetchMyPoint = async () => {
      if (!address) return
      try {
        const res = await (await gashaAPI(`/points/${address}`)).json()
        setMyPoints(res.points)
      } catch (error) {
        setMyPoints(0)
      }
    }
    fetchMyPoint()
  }, [address])

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await (await gashaAPI('/points/total')).json()
      setTotalPoints(res.points)
    }
    fetchTotal()
  }, [])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = (await (await gashaAPI('/points')).json()) as Leaderboard
      setLeaderboard(res)
    }
    fetchLeaderboard()
  }, [])

  return { leaderboard, totalPoints, myPoints }
}
