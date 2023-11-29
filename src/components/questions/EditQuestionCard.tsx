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
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
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
        <FormGroup>
          <TextareaAutosize
            minRows={3}
            maxRows={5}
            placeholder="Answer Text"
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
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </FormGroup>
      )}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default EditQuestionCard
