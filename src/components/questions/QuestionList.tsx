import React, { useEffect, useState } from "react"
import { Box, Pagination } from "@mui/material"
import {
  Question,
  deleteQuestion,
  fetchQuestions,
} from "../../features/questions/questionsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuestionCard from "./QuestionCard"
import ConfirmationModal from "../common/ConfirmationModal"
import { useNavigate } from "react-router-dom"
import TopInfo from "../common/TopInfo"

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

  const itemsPerPage = 4
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
    navigate(`/edit-questionSet/${questionSetId}/${question._id}`)
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
        leftItem={{ type: "arrowBack" }}
        rightItem={{
          type: "addItem",
          rightHandler: handleAddQuestion,
          tooltip: "question",
        }}
        title={`Questions in ${questionSetTitle}`}
      ></TopInfo>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {paginatedQuestions.map((question, index) => (
          <Box width={"80%"} key={question._id}>
            <QuestionCard
              index={(currentPage - 1) * itemsPerPage + index + 1}
              question={question}
              onDelete={handleRemoveQuestion}
              onEdit={handleEditQuestion}
            />
          </Box>
        ))}

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: "10px" }}
        />
      </Box>

      <ConfirmationModal
        typography={{
          title: "Delete question?",
          text: "Are you sure you want to delete this question?",
          actionLabel: "Delete",
        }}
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default QuestionList
