import { useEffect, useState } from "react"
import { useStatus } from "../context/status/useStatus"
const LOCAL_TIME_KEY = "startTime"

export const getDuration = (from) => {
  const seconds = Math.floor((Date.now() - from) / 1000) // total en segundos
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

function Counter() {
  const [startTime, setStartTime] = useState(() => {
    const saved = localStorage.getItem(LOCAL_TIME_KEY)
    return saved ? Number(saved) : null
  })

  const { status } = useStatus()

  // solo para provocar renders
  const [, forceRender] = useState(0)

  useEffect(() => {
    if (status === "ocupado") {
      if (startTime === null) {
        const now = Date.now()
        setStartTime(now)
        localStorage.setItem(LOCAL_TIME_KEY, now)
      }
    } else {
      if (startTime !== null) {
        setStartTime(null)
        localStorage.removeItem(LOCAL_TIME_KEY)
      }
    }
  }, [status, startTime])

  useEffect(() => {
    if (!startTime) return

    const id = setInterval(() => {
      forceRender((n) => n + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [startTime])

  return <>{startTime ? getDuration(startTime) : "00:00:00"}</>
}

export default Counter
