import React, { useState } from "react"
import {
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import {
  createQuestion,
  Question,
  Answer,
} from "../../features/questions/questionsSlice"
import { useAppDispatch } from "../../app/hooks"

interface CreateQuestionFormProps {
  questionSetId: string
}

const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({
  questionSetId,
}) => {
  const dispatch = useAppDispatch()

  const [newQuestionTitle, setNewQuestionTitle] = useState("")
  const [newQuestionText, setNewQuestionText] = useState("")
  const [newAnswerText, setNewAnswerText] = useState("")
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false)

  const handleCreateQuestion = () => {
    const newQuestion: Question = {
      questionSetId,
      title: newQuestionTitle,
      text: newQuestionText,
      answers: [
        {
          answerText: newAnswerText,
          isCorrect: newAnswerIsCorrect,
        },
      ],
    }

    dispatch(createQuestion(newQuestion))

    // Reset form fields
    setNewQuestionTitle("")
    setNewQuestionText("")
    setNewAnswerText("")
    setNewAnswerIsCorrect(false)
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <TextField
        label="Title"
        value={newQuestionTitle}
        onChange={(e) => setNewQuestionTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Text"
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Answer Text"
        value={newAnswerText}
        onChange={(e) => setNewAnswerText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newAnswerIsCorrect}
            onChange={(e) => setNewAnswerIsCorrect(e.target.checked)}
          />
        }
        label="Is Correct?"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateQuestion}
      >
        Create
      </Button>
    </Paper>
  )
}

export default CreateQuestionForm
