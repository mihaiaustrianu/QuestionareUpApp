import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
  IconButton,
  Paper,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import { Question } from "../../features/questions/questionsSlice"
import { textareaStyles } from "../../styles/textareaStyle"

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

  const handleChange = (field: string, value: string) => {
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(editedQuestion)
  }

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

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

  const handleDeleteAnswer = (indexToDelete: number) => {
    setEditedQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.answers]
      updatedAnswers.splice(indexToDelete, 1)
      return {
        ...prevQuestion,
        answers: updatedAnswers,
      }
    })
    // Clear the selected answer after deletion
    setSelectedAnswer(null)
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

      <p>Answers</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ToggleButtonGroup
          value={selectedAnswer}
          exclusive
          onChange={handleAnswerChange}
        >
          {editedQuestion.answers.map((answer, index) => (
            <ToggleButton key={index} value={index}>
              <p>Q. {index}</p>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <IconButton onClick={handleAddAnswer} color="primary">
          <AddIcon />
        </IconButton>
      </div>

      {selectedAnswer !== null && (
        <Paper elevation={5} sx={{ position: "relative", padding: "20px" }}>
          <IconButton
            onClick={() => handleDeleteAnswer(selectedAnswer)}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            <ClearIcon />
          </IconButton>
          <FormGroup>
            <TextareaAutosize
              style={textareaStyles}
              minRows={3}
              maxRows={5}
              placeholder="Enter Answer Text"
              value={editedQuestion.answers[selectedAnswer]?.answerText || ""}
              onChange={(e) => handleAnswerTextChange(e.target.value)}
            />
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={
                  editedQuestion.answers[selectedAnswer]?.isCorrect
                    ? "true"
                    : "false"
                }
                onChange={(e) => handleIsCorrectChange(e.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
        </Paper>
      )}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default EditQuestionCard
