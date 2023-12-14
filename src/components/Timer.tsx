import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"

const Timer = ({ initialSeconds, endTime }) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = Math.max(0, endTime - Date.now()) / 1000
      setSeconds(Math.floor(remainingTime))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [endTime])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const remainingSeconds = time % 60

    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return <Typography variant="h4">Timer: {formatTime(seconds)}</Typography>
}

export default Timer
