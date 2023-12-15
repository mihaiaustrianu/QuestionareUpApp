import React from "react"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { Question } from "../../features/questions/questionsSlice"

interface QuestionCardProps {
  question: Question
  onEdit: (question: Question) => void
  onDelete: (question: Question) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
}) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
        >
          {question.text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Edit" onClick={() => onEdit(question)}>
          <Edit />
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => onDelete(question)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default QuestionCard
