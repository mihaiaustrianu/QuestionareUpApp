import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
} from "@mui/material"
import { Question, Answer } from "../../features/questions/questionsSlice"

interface EditQuestionModalProps {
  open: boolean
  question: Question
  onClose: () => void
  onSave: (updatedQuestion: Question) => void
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  open,
  question,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question)
  const [newAnswerText, setNewAnswerText] = useState("")
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false)

  const handleSave = () => {
    onSave(editedQuestion)
    onClose()
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      title: event.target.value,
    }))
  }

  const handleChangeText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      text: event.target.value,
    }))
  }

  const handleChangeAnswerText = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const answers = [...editedQuestion.answers]
    answers[index] = {
      ...answers[index],
      answerText: event.target.value,
    }
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: answers,
    }))
  }

  const handleChangeAnswerIsCorrect = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const answers = [...editedQuestion.answers]
    answers[index] = {
      ...answers[index],
      isCorrect: checked,
    }
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: answers,
    }))
  }

  const handleAddAnswer = () => {
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={editedQuestion.title}
          onChange={handleChangeTitle}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Text"
          value={editedQuestion.text}
          onChange={handleChangeText}
          fullWidth
          margin="normal"
        />
        {editedQuestion.answers.map((answer, index) => (
          <div key={index}>
            <TextField
              label="Answer Text"
              value={answer.answerText}
              onChange={(e) => handleChangeAnswerText(index, e)}
              fullWidth
              margin="normal"
            />
            <Checkbox
              checked={answer.isCorrect}
              onChange={(e, checked) =>
                handleChangeAnswerIsCorrect(index, e, checked)
              }
            />
          </div>
        ))}
        <div>
          <TextField
            label="New Answer Text"
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Checkbox
            checked={newAnswerIsCorrect}
            onChange={(e) => setNewAnswerIsCorrect(e.target.checked)}
          />
          <Button variant="outlined" color="primary" onClick={handleAddAnswer}>
            Add Answer
          </Button>
        </div>
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
