import React from "react"
import {
  Paper,
  IconButton,
  FormGroup,
  TextareaAutosize,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { textareaStyles } from "../../styles/textareaStyle"
import { Answer } from "../../features/questions/questionsSlice"

interface AnswerCardProps {
  answer: Answer
  onDelete: () => void
  onAnswerTextChange: (value: string) => void
  onIsCorrectChange: (value: string) => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  onDelete,
  onAnswerTextChange,
  onIsCorrectChange,
}) => {
  return (
    <Paper elevation={5} sx={{ position: "relative", padding: "20px" }}>
      <IconButton
        onClick={onDelete}
        style={{ position: "absolute", bottom: "20px", right: "8px" }}
      >
        <DeleteIcon />
      </IconButton>
      <FormGroup>
        <TextareaAutosize
          style={textareaStyles}
          minRows={3}
          maxRows={5}
          placeholder="Enter Answer Text"
          value={answer.answerText}
          onChange={(e) => onAnswerTextChange(e.target.value)}
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={answer.isCorrect ? "true" : "false"}
            onChange={(e) => onIsCorrectChange(e.target.value)}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </Paper>
  )
}

export default AnswerCard
