import React, { useEffect, useState } from "react"
import {
  FormControl,
  TextField,
  Checkbox,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material"
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

  const handleIsCorrectChange = () => {
    if (selectedAnswer !== null) {
      setEditedQuestion((prevQuestion) => {
        const updatedAnswers = [...prevQuestion.answers]
        updatedAnswers[selectedAnswer] = {
          ...updatedAnswers[selectedAnswer],
          isCorrect: !updatedAnswers[selectedAnswer].isCorrect,
        }
        return {
          ...prevQuestion,
          answers: updatedAnswers,
        }
      })
    }
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

      {selectedAnswer !== null && (
        <FormGroup>
          <TextareaAutosize
            minRows={3}
            maxRows={5}
            placeholder="Answer Text"
            value={editedQuestion.answers[selectedAnswer]?.answerText || ""}
            onChange={(e) => handleAnswerTextChange(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  editedQuestion.answers[selectedAnswer]?.isCorrect || false
                }
                onChange={handleIsCorrectChange}
              />
            }
            label="Is Correct?"
          />
        </FormGroup>
      )}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default EditQuestionCard
