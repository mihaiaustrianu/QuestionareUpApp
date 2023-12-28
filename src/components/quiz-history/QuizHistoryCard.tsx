import React from "react"
import { CardContent, CardActions, Typography, IconButton } from "@mui/material"
import CustomCard from "../common/CustomCard"

const QuizHistoryCard = ({ quiz, onClickSet }) => {
  const formattedDate = new Date(quiz.submissionDate).toLocaleString()
  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5">{formattedDate}</Typography>
        {/* <Typography>{quiz.description}</Typography>  */}
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="View Questions"
          onClick={() => onClickSet(quiz)}
        >
          Review Quiz
        </IconButton>
      </CardActions>
    </CustomCard>
  )
}

export default QuizHistoryCard
