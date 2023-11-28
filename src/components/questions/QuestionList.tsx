import React, { useEffect, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import { Add } from "@mui/icons-material"
import {
  Question,
  deleteQuestion,
  fetchQuestions,
} from "../../features/questions/questionsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuestionCard from "./QuestionCard"
import ConfirmationModal from "./ConfirmationModal"
import { useNavigate } from "react-router-dom"

const QuestionList: React.FC = () => {
  const dispatch = useAppDispatch()

  const questionSetId = useAppSelector((state) => state.question.questionSetId)
  const questionSetTitle = useAppSelector(
    (state) => state.question.questionSetTitle,
  )

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQuestions(questionSetId))
  }, [dispatch, questionSetId])

  const questions: Question[] = useAppSelector(
    (state) => state.question.questions,
  )

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

  const handleAddQuestion = () => {
    navigate("/create-question")
  }

  const handleEditQuestion = (question: Question) => {
    navigate(`/edit-question/${question._id}`)
  }

  return (
    <Box sx={{ width: "80%" }}>
      <Typography marginLeft={"20px"} variant="h4">
        Questions in {questionSetTitle}
      </Typography>

      {questions.map((question) => (
        <div key={question._id}>
          <QuestionCard
            question={question}
            onDelete={handleRemoveQuestion}
            onEdit={handleEditQuestion}
          />
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddQuestion}
      >
        Add New Question
      </Button>

      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default QuestionList
