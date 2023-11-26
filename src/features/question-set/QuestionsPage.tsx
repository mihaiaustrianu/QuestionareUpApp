import React from "react"
import UserQuestionSets from "../../components/question-set/UserQuestionSets"
import { Box } from "@mui/material"

export default function QuestionsPage() {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <UserQuestionSets />
    </Box>
  )
}
