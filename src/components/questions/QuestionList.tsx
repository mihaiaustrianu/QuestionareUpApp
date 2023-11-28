import React, { useEffect, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
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
import QuestionModal from "./QuestionModal"

const QuestionList: React.FC = () => {
  const dispatch = useAppDispatch()

  const questionSetId = useAppSelector((state) => state.question.questionSetId) // Access questionSetId from the store
  const questionSetTitle = useAppSelector(
    (state) => state.question.questionSetTitle,
  ) // Access questionSetId from the store

  useEffect(() => {
    dispatch(fetchQuestions(questionSetId))
  }, [dispatch, questionSetId])

  const questions: Question[] = useAppSelector(
    (state) => state.question.questions,
  )

  const [isNewQuestionModalOpen, setNewQuestionModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAddQuestion = () => {
    setNewQuestionModalOpen(true)
  }

  const handleCreateQuestion = (question: Question) => {
    dispatch(createQuestion(question))
    setNewQuestionModalOpen(false)
  }

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question)
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
    setIsEditModalOpen(false)
  }

  return (
    <Box sx={{ width: "80%" }}>
      <Typography marginLeft={"20px"} variant="h4">
        Questions in {questionSetTitle}
      </Typography>

      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          question={question}
          onEdit={handleEditQuestion}
          onDelete={handleRemoveQuestion}
        />
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
      {selectedQuestion && (
        <QuestionModal
          open={isEditModalOpen}
          question={selectedQuestion}
          isNew={false} // For editing existing question
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedQuestion}
        />
      )}

      {isNewQuestionModalOpen && (
        <QuestionModal
          open={isNewQuestionModalOpen}
          question={{
            questionSetId: questionSetId,
            title: "",
            text: "",
            answers: [],
          }}
          isNew={true} // For creating new question
          onClose={() => setNewQuestionModalOpen(false)}
          onSave={handleCreateQuestion}
        />
      )}
    </Box>
  )
}

export default QuestionList
