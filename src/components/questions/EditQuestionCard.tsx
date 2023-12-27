import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material"
import AnswerCard from "./AnswerCard"
import TopInfo from "../common/TopInfo"
import { Question } from "../../features/questions/questionsSlice"

interface EditQuestionCardProps {
  question?: Question
  onSave: (updatedQuestion: Question) => void
}

const EditQuestionCard: React.FC<EditQuestionCardProps> = ({
  question,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    text: "",
    answers: [],
  })

  useEffect(() => {
    if (question) {
      setEditedQuestion(question)
    }
  }, [question])

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
    if (!editedQuestion.text) {
      setAlertMessage("Please fill out all required fields.")
      setAlertSeverity("error")
      setAlertOpen(true)
      return
    }

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

  const handleAnswerTextChange = (index: number, value: string) => {
    setEditedQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.answers]
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        answerText: value,
      }
      return {
        ...prevQuestion,
        answers: updatedAnswers,
      }
    })
  }

  const handleIsCorrectChange = (index: number, value: boolean) => {
    setEditedQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.answers]
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        isCorrect: value,
      }
      return {
        ...prevQuestion,
        answers: updatedAnswers,
      }
    })
  }

  const handleAddAnswer = () => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [...prevQuestion.answers, { answerText: "", isCorrect: false }],
    }))
  }

  const handleDeleteAnswer = (index: number) => {
    setEditedQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.answers]
      updatedAnswers.splice(index, 1)
      return {
        ...prevQuestion,
        answers: updatedAnswers,
      }
    })
  }

  return (
    <Box>
      <TopInfo
        leftItem={{ type: "arrowBack" }}
        rightItem={{
          type: "addItem",
          rightHandler: handleAddAnswer,
          tooltip: "answer",
        }}
        title={"Edit Question"}
      />
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

      {editedQuestion.answers.map((answer, index) => (
        <AnswerCard
          key={index}
          answer={answer}
          onDelete={() => handleDeleteAnswer(index)}
          onAnswerTextChange={(value) => handleAnswerTextChange(index, value)}
          onIsCorrectChange={(value) => handleIsCorrectChange(index, value)}
        />
      ))}

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
