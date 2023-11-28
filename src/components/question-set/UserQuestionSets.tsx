import React, { useEffect, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import { Add } from "@mui/icons-material"
import {
  QuestionSet,
  createQuestionSet,
  deleteQuestionSet,
  fetchQuestionSets,
  updateQuestionSet,
} from "../../features/question-set/questionSetSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuestionSetCard from "./QuestionSetCard"
import ConfirmationModal from "./ConfirmationModal"
import QuestionSetModal from "./QuestionSetModal"

import {
  setQuestionSetId,
  setQuestionSetTitle,
} from "../../features/questions/questionsSlice"
import { useNavigate } from "react-router-dom"

const UserQuestionSets = () => {
  const dispatch = useAppDispatch()

  const questionStatus = useAppSelector((state) => state.questionSet.status)

  const navigate = useNavigate()

  useEffect(() => {
    if (questionStatus === "idle") dispatch(fetchQuestionSets())
  }, [dispatch, questionStatus])

  const questionSets: QuestionSet[] = useAppSelector(
    (state) => state.questionSet.questionSets,
  )

  const [isCreateModalOpen, setisCreateModalOpen] = useState(false)
  const [selectedQuestionSet, setSelectedQuestionSet] =
    useState<QuestionSet | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAddQuestionSet = () => {
    setisCreateModalOpen(true)
  }

  const handleCreateQuestionSet = (questionSet: QuestionSet) => {
    dispatch(createQuestionSet(questionSet))
    setisCreateModalOpen(false)
  }

  const handleEditQuestionSet = (questionSet: QuestionSet) => {
    setSelectedQuestionSet(questionSet)
    setisCreateModalOpen(false)
    setIsEditModalOpen(true)
  }

  const handleRemoveQuestionSet = (questionSet: QuestionSet) => {
    setSelectedQuestionSet(questionSet)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedQuestionSet) {
      dispatch(deleteQuestionSet(selectedQuestionSet._id))
    }
    setIsDeleteModalOpen(false)
    setSelectedQuestionSet(null)
  }

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedQuestionSet(null)
  }

  const handleSaveEditedQuestionSet = (updatedQuestionSet: QuestionSet) => {
    dispatch(updateQuestionSet(updatedQuestionSet))
  }

  const handleQuestionSetClick = (questionSet: QuestionSet) => {
    setSelectedQuestionSet(questionSet)
    navigate(`/editQuestionSet/${questionSet._id}`)
    dispatch(setQuestionSetId(questionSet._id))
    dispatch(setQuestionSetTitle(questionSet.title))
  }

  return (
    <Box width={"80%"}>
      <Typography marginLeft={"20px"} variant="h4">
        User Question Sets
      </Typography>

      {questionSets.map((questionSet) => (
        <QuestionSetCard
          key={questionSet._id}
          questionSet={questionSet}
          onEdit={handleEditQuestionSet}
          onDelete={handleRemoveQuestionSet}
          onClickSet={() => handleQuestionSetClick(questionSet)} // Add click handler
        />
      ))}

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddQuestionSet}
      >
        Add New Question Set
      </Button>

      <QuestionSetModal
        open={isCreateModalOpen}
        questionSet={null} // Passing null for creating new question set
        onClose={() => setisCreateModalOpen(false)}
        onSave={handleCreateQuestionSet}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <QuestionSetModal
        open={isEditModalOpen}
        questionSet={selectedQuestionSet}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedQuestionSet}
      />
    </Box>
  )
}

export default UserQuestionSets
