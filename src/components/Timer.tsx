import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0))
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

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
