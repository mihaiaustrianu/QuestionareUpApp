import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  Pagination,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material"
import { Add, ArrowBack } from "@mui/icons-material"
import {
  Question,
  deleteQuestion,
  fetchQuestions,
} from "../../features/questions/questionsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuestionCard from "./QuestionCard"
import ConfirmationModal from "../ConfirmationModal"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import TopInfo from "../TopInfo"

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

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(questions.length / itemsPerPage)

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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

  const handleNavigateBack = () => {
    navigate(-1)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  return (
    <Box>
      <TopInfo
        leftItem={{ type: "arrowBack", leftHandler: handleNavigateBack }}
        rightItem={{
          type: "addItem",
          rightHandler: handleAddQuestion,
          tooltip: "question",
        }}
        title={`Questions in ${questionSetTitle}`}
      ></TopInfo>
      {paginatedQuestions.map((question) => (
        <div key={question._id}>
          <QuestionCard
            question={question}
            onDelete={handleRemoveQuestion}
            onEdit={handleEditQuestion}
          />
        </div>
      ))}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "10px" }}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default QuestionList
