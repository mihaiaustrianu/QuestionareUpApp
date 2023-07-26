import React, { ChangeEvent, useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { Add } from "@mui/icons-material"
import {
  Question,
  createQuestion,
  deleteQuestion,
  fetchQuestions,
  updateQuestion,
} from "../../features/questions/questionsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuestionCard from "./QuestionCard"
import ConfirmationModal from "./ConfirmationModal"
import EditQuestionModal from "./EditQuestionModal"

interface QuestionListProps {
  questionSetId: string
}

const QuestionList: React.FC<QuestionListProps> = ({ questionSetId }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchQuestions(questionSetId))
  }, [dispatch, questionSetId])

  const questions: Question[] = useAppSelector(
    (state) => state.question.questions,
  )

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newQuestionTitle, setNewQuestionTitle] = useState("")
  const [newQuestionText, setNewQuestionText] = useState("")
  const [newAnswerText, setNewAnswerText] = useState("")
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAddQuestion = () => {
    setIsFormOpen(true)
  }

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
    setIsFormOpen(false)
  }

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setIsFormOpen(false)
    setIsEditModalOpen(true)
  }

  const handleRemoveQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedQuestion) {
      dispatch(deleteQuestion(selectedQuestion._id))
    }
    setIsDeleteModalOpen(false)
    setSelectedQuestion(null)
  }

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedQuestion(null)
  }

  const handleSaveEditedQuestion = (updatedQuestion: Question) => {
    dispatch(updateQuestion(updatedQuestion))
  }

  return (
    <Box>
      <Typography variant="h5">Questions</Typography>

      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          question={question}
          onEdit={handleEditQuestion}
          onDelete={handleRemoveQuestion}
        />
      ))}

      {!isFormOpen ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddQuestion}
        >
          Add New Question
        </Button>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Create New Question</Typography>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewAnswerIsCorrect(e.target.checked)
                }
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
        </Paper>
      )}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {selectedQuestion && (
        <EditQuestionModal
          open={isEditModalOpen}
          question={selectedQuestion}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedQuestion}
        />
      )}
    </Box>
  )
}

export default QuestionList
