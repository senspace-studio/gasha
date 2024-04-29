import { gashaAPI } from "@/lib/gashaAPI"
import { useEffect, useState } from "react"

export const useRemainingTime = () => {
  const [time, setTime] = useState("XX:XX:XX:XX")

  useEffect(() => {
    // intervalを使って1秒ごとにtimeを更新する. timeは2024-03-30までの残り時間をDD:HH:MM:SSの形式で表示する
    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date(1719300400 * 1000)
      const diff = target.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const formattedHours = hours < 10 ? `0${hours}` : hours
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
      if (seconds > -1) {
        setTime(
          `${days}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        )
      } else {
        setTime("END")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}

export const useCurrentMints = () => {
  const [mints, setMints] = useState(0)

  useEffect(() => {
    const getMints = async () => {
      const res = await (await gashaAPI("/points/total")).json()
      setMints(res.nfts)
    }
    getMints()
  }, [])

  return { mints }
}
