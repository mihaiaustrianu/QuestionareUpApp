import { Box } from "@mui/material"
import React from "react"
import TopInfo from "../common/TopInfo"

export default function QuizHistory() {
  return (
    <Box>
      <TopInfo
        leftItem={{ type: "none" }}
        rightItem={{ type: "none" }}
        title={`Your past quizes`}
      ></TopInfo>
    </Box>
  )
}
