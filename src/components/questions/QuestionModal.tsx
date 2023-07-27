import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  Typography,
  FormControl,
  FormControlLabel,
} from "@mui/material"
import { Question, Answer } from "../../features/questions/questionsSlice"
import AnswerField from "./AnswerField"

interface EditQuestionModalProps {
  open: boolean
  question: Question
  isNew: boolean // isNew prop to differentiate between creating and editing
  onClose: () => void
  onSave: (updatedQuestion: Question) => void
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  question,
  isNew,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question)
  const [newAnswerText, setNewAnswerText] = useState("")
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false)

  const handleSave = () => {
    if (newAnswerText) {
      handleAddAnswer()
    }
    onSave(editedQuestion)
    onClose()
  }

  const handleChange = (field: string, value: string | boolean) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }))
  }

  const handleAnswerChange = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    const answers = [...editedQuestion.answers]
    answers[index] = {
      ...answers[index],
      [field]: value,
    }
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: answers,
    }))
  }

  const handleAddAnswer = () => {
    if (newAnswerText) {
      const newAnswer: Answer = {
        answerText: newAnswerText,
        isCorrect: newAnswerIsCorrect,
      }

      setEditedQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: [...prevQuestion.answers, newAnswer],
      }))

      // Reset new answer fields
      setNewAnswerText("")
      setNewAnswerIsCorrect(false)
    }
  }

  const handleDeleteAnswer = (index: number) => {
    const answers = [...editedQuestion.answers]
    answers.splice(index, 1)
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: answers,
    }))
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isNew ? "Create New Question" : "Edit Question"}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="Title"
            value={editedQuestion.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="Question text"
            value={editedQuestion.text}
            onChange={(e) => handleChange("text", e.target.value)}
            fullWidth
            multiline
          />
        </FormControl>
        <Typography>Answer list:</Typography>
        {editedQuestion.answers.map((answer, index) => (
          <AnswerField
            key={index}
            answer={answer}
            onChange={(field, value) => handleAnswerChange(index, field, value)}
            onDelete={() => handleDeleteAnswer(index)}
          />
        ))}
        <FormControl fullWidth margin="normal">
          <TextField
            label="New Answer Text"
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            fullWidth
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
          <Button variant="outlined" color="primary" onClick={handleAddAnswer}>
            Add Answer
          </Button>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditQuestionModal
