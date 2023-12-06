import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Typography,
  Box,
  Alert,
  AlertTitle,
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

  // Alert states
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<string | any>("")
  const [alertOpen, setAlertOpen] = useState(false)

  const handleChange = (field: string, value: string) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Validate if any of the required fields are empty
    if (!editedQuestion.title || !editedQuestion.text) {
      setAlertMessage("Please fill out all required fields.")
      setAlertSeverity("error")
      setAlertOpen(true)
      return
    }

    // Optionally, you can also check if any of the answers are empty
    const hasEmptyAnswers = editedQuestion.answers.some(
      (answer) => !answer.answerText.trim(),
    )
    if (hasEmptyAnswers) {
      setAlertMessage("Please fill out all answer fields.")
      setAlertSeverity("error")
      setAlertOpen(true)
      return
    }

    // Proceed with saving if all fields are filled
    onSave(editedQuestion)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
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
    setSelectedAnswer(editedQuestion.answers.length)
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
    <Box>
      <FormControl fullWidth margin="normal" required>
        <TextField
          label="Title"
          required
          value={editedQuestion.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <TextField
          required
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
              <p>A.{index}</p>
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

      {alertOpen && (
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          <AlertTitle>
            {alertSeverity === "error" ? "Error" : "Success"}
          </AlertTitle>
          {alertMessage}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: "10px" }}
      >
        Save
      </Button>
    </Box>
  )
}

export default EditQuestionCard
