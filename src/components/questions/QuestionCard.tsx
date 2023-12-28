import React from "react"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Grid,
  Box,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { Question } from "../../features/questions/questionsSlice"
import CustomCard from "../common/CustomCard"

interface QuestionCardProps {
  question: Question
  onEdit: (question: Question) => void
  onDelete: (question: Question) => void
  index: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    <CustomCard>
      <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
        <Chip
          color="secondary"
          variant="outlined"
          label={index}
          sx={{
            fontWeight: "bold",
            marginRight: "8px",
          }}
        />
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
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label="Edit" onClick={() => onEdit(question)}>
          <Edit />
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => onDelete(question)}>
          <Delete />
        </IconButton>
      </CardActions>
    </CustomCard>
  )
}

export default QuestionCard
