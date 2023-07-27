import React, { useEffect, useState } from "react"
import { Box, Typography, Button, TextField } from "@mui/material"
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
import EditQuestionSetModal from "./EditQSModal"
import { setQuestionSetId } from "../../features/questions/questionsSlice"

const UserQuestionSets = () => {
  const dispatch = useAppDispatch()

  const questionStatus = useAppSelector((state) => state.questionSet.status)

  useEffect(() => {
    if (questionStatus === "idle") dispatch(fetchQuestionSets())
  }, [dispatch, questionStatus])

  const questionSets: QuestionSet[] = useAppSelector(
    (state) => state.questionSet.questionSets,
  )

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newQuestionSetTitle, setNewQuestionSetTitle] = useState("")
  const [newQuestionSetDescription, setNewQuestionSetDescription] = useState("")
  const [selectedQuestionSet, setSelectedQuestionSet] =
    useState<QuestionSet | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAddQuestionSet = () => {
    setIsFormOpen(true)
  }

  const handleCreateQuestionSet = () => {
    const questionSet = {
      title: newQuestionSetTitle,
      description: newQuestionSetDescription,
    }

    dispatch(createQuestionSet(questionSet))

    // Reset form fields
    setNewQuestionSetTitle("")
    setNewQuestionSetDescription("")
    setIsFormOpen(false)
  }

  const handleEditQuestionSet = (questionSet: QuestionSet) => {
    setSelectedQuestionSet(questionSet)
    setIsFormOpen(false)
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
    dispatch(setQuestionSetId(questionSet._id))
  }

  return (
    <Box>
      <Typography variant="h5">User Question Sets</Typography>

      {questionSets.map((questionSet) => (
        <QuestionSetCard
          key={questionSet._id}
          questionSet={questionSet}
          onEdit={handleEditQuestionSet}
          onDelete={handleRemoveQuestionSet}
          onClickSet={() => handleQuestionSetClick(questionSet)} // Add click handler
        />
      ))}

      {!isFormOpen ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddQuestionSet}
        >
          Add New Question Set
        </Button>
      ) : (
        <Box marginTop={2}>
          <Typography variant="h6">Create New Question Set</Typography>
          <TextField
            label="Title"
            value={newQuestionSetTitle}
            onChange={(e) => setNewQuestionSetTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newQuestionSetDescription}
            onChange={(e) => setNewQuestionSetDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateQuestionSet}
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
        </Box>
      )}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <EditQuestionSetModal
        open={isEditModalOpen}
        questionSet={selectedQuestionSet}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedQuestionSet}
      />
    </Box>
  )
}

export default UserQuestionSets
