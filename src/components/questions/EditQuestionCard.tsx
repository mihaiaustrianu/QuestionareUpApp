import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Question } from "../../features/questions/questionsSlice"
import ConfirmationModal from "./ConfirmationModal"
import AnswerCard from "./AnswerCard"

interface EditQuestionCardProps {
  question?: Question
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

  useEffect(() => {
    if (question) {
      setEditedQuestion(question)
    }
  }, [question])

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false)

  const handleChange = (field: string, value: string) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(editedQuestion)
  }

  const handleAnswerChange = (
    event: React.MouseEvent<HTMLElement>,
    newAnswer: number | null,
  ) => {
    setSelectedAnswer(newAnswer)
  }

  const handleAnswerTextChange = (value: string) => {
    if (selectedAnswer !== null) {
      setEditedQuestion((prevQuestion) => {
        const updatedAnswers = [...prevQuestion.answers]
        updatedAnswers[selectedAnswer] = {
          ...updatedAnswers[selectedAnswer],
          answerText: value,
        }
        return {
          ...prevQuestion,
          answers: updatedAnswers,
        }
      })
    }
  }

  const handleIsCorrectChange = (value: string) => {
    if (selectedAnswer !== null) {
      setEditedQuestion((prevQuestion) => {
        const updatedAnswers = [...prevQuestion.answers]
        updatedAnswers[selectedAnswer] = {
          ...updatedAnswers[selectedAnswer],
          isCorrect: value === "true",
        }
        return {
          ...prevQuestion,
          answers: updatedAnswers,
        }
      })
    }
  }

  const handleAddAnswer = () => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [...prevQuestion.answers, { answerText: "", isCorrect: false }],
    }))
  }

  const handleDeleteAnswer = () => {
    setConfirmationModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedAnswer !== null) {
      setEditedQuestion((prevQuestion) => {
        const updatedAnswers = [...prevQuestion.answers]
        updatedAnswers.splice(selectedAnswer, 1)
        return {
          ...prevQuestion,
          answers: updatedAnswers,
        }
      })
      setSelectedAnswer(null)
    }
    setConfirmationModalOpen(false)
  }

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false)
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

      <Typography variant="h6">Answers:</Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ToggleButtonGroup
          value={selectedAnswer}
          exclusive
          onChange={handleAnswerChange}
        >
          {editedQuestion.answers.map((answer, index) => (
            <ToggleButton key={index} value={index}>
              <p>Q.{index}</p>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <IconButton onClick={handleAddAnswer} color="primary">
          <AddIcon />
        </IconButton>
      </div>

      {selectedAnswer !== null && (
        <AnswerCard
          answer={editedQuestion.answers[selectedAnswer]}
          onDelete={handleDeleteAnswer}
          onAnswerTextChange={handleAnswerTextChange}
          onIsCorrectChange={handleIsCorrectChange}
        />
      )}
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: "10px" }}
      >
        Save
      </Button>
    </div>
  )
}

export default EditQuestionCard
