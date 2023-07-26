import React from "react"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"

const QuestionSetCard = ({ questionSet, onEdit, onDelete, onClickSet }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{questionSet.title}</Typography>
        <Typography>{questionSet.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Edit" onClick={() => onEdit(questionSet)}>
          <Edit />
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => onDelete(questionSet)}>
          <Delete />
        </IconButton>
        <IconButton
          aria-label="View Questions"
          onClick={() => onClickSet(questionSet)}
        >
          {/* You can use any icon that indicates "view" */}
          {/* For example: <Visibility /> */}
          View Questions
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default QuestionSetCard
