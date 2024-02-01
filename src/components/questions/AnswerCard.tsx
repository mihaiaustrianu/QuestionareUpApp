import React from "react"
import {
  IconButton,
  FormGroup,
  Checkbox,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { Answer } from "../../features/questions/questionsSlice"
import CustomCard from "../common/CustomCard"

interface AnswerCardProps {
  answer: Answer
  onDelete: () => void
  onAnswerTextChange: (value: string) => void
  onAnswerDescriptionChange: (value: string) => void
  onIsCorrectChange: (value: boolean) => void // Change the type to boolean
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  onDelete,
  onAnswerTextChange,
  onAnswerDescriptionChange,
  onIsCorrectChange,
}) => {
  return (
    <CustomCard>
      <Tooltip title={"Delete?"} placement="left">
        <IconButton
          color="error"
          onClick={onDelete}
          sx={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <FormGroup>
        <TextField
          sx={{ width: "90%" }}
          multiline
          maxRows={3}
          placeholder="Enter Answer Text"
          value={answer.answerText}
          onChange={(e) => onAnswerTextChange(e.target.value)}
        ></TextField>
        <Typography mt={2}>Answer Description:</Typography>
        <TextField
          sx={{ width: "90%" }}
          multiline
          maxRows={3}
          placeholder="Enter Answer Description"
          value={answer.answerDescription}
          onChange={(e) => onAnswerDescriptionChange(e.target.value)}
        ></TextField>
        <Tooltip title={"Correct ?"} placement="left">
          <Checkbox
            color="success"
            checked={answer.isCorrect}
            onChange={(e) => onIsCorrectChange(e.target.checked)}
            sx={{ position: "absolute", bottom: "8px", right: "8px" }}
          />
        </Tooltip>
      </FormGroup>
    </CustomCard>
  )
}

export default AnswerCard
