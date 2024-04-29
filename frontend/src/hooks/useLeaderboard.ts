import { Leaderboard } from "@/gasha"
import { gashaAPI } from "@/lib/gashaAPI"
import { useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

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
      const res = await (await gashaAPI("/points/total")).json()
      setTotalPoints(res.points)
    }
    fetchTotal()
  }, [])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = (await (await gashaAPI("/points")).json()) as Leaderboard
      setLeaderboard(res)
    }
    fetchLeaderboard()
  }, [])

  const adminAddresses = [
    "0xf98b7e44efe4c60264564554b885ab884d0dd904",
    "0xdcb93093424447bf4fe9df869750950922f1e30b",
    "0x62ad333e0c4164d86644a1d73fb792254ff0e1c6",
    "0xa5d7901510512c876617a6d24e820a0efc39aa92",
    "0xe9d387b9ed1327e59589da2b82fb491817703bc1",
    "0x376e451f04863508a7dce0b993354520e9acee71",
    "0xb17e447d0eb15c444789886f2bff6a4907140bc5",
  ]

  return {
    leaderboard,
    totalPoints,
    myPoints,
  }
}
