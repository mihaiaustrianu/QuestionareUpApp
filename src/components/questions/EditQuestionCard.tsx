import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material"
import AnswerField from "./AnswerField"
import { Question } from "../../features/questions/questionsSlice"

interface EditQuestionCardProps {
  question?: Question // Make the question prop optional
  onSave: (updatedQuestion: Question) => void
}

const EditQuestionCard: React.FC<EditQuestionCardProps> = ({
  question,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    title: "",
    text: "",
    answers: [],
  })
  const [newAnswerText, setNewAnswerText] = useState("")
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false)

  useEffect(() => {
    // If a question is provided, initialize the state with its values
    if (question) {
      setEditedQuestion(question)
    }
  }, [question])

  const handleChange = (field: string, value: string) => {
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

  const handleDeleteAnswer = (index: number) => {
    const answers = [...editedQuestion.answers]
    answers.splice(index, 1)
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: answers,
    }))
  }

  const handleAddAnswer = () => {
    if (newAnswerText) {
      const newAnswer = {
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

  const handleSave = () => {
    onSave(editedQuestion)
  }

  return (
    <div>
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

      {/* Answer list */}
      {editedQuestion.answers.map((answer, index) => (
        <AnswerField
          key={index}
          answer={answer}
          onChange={(field, value) => handleAnswerChange(index, field, value)}
          onDelete={() => handleDeleteAnswer(index)}
        />
      ))}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default EditQuestionCard
