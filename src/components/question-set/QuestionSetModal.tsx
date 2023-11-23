import React, { useEffect, useState } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { QuestionSet } from "../../features/question-set/questionSetSlice"

interface QuestionSetModalProps {
  open: boolean
  questionSet: QuestionSet | null
  onClose: () => void
  onSave: (questionSet: QuestionSet) => void
}

const QuestionSetModal: React.FC<QuestionSetModalProps> = ({
  open,
  questionSet,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (questionSet !== null) {
      setTitle(questionSet.title)
      setDescription(questionSet.description)
    } else {
      // If creating a new question set, reset the fields
      setTitle("")
      setDescription("")
    }
  }, [questionSet])

  const handleSave = () => {
    const updatedQuestionSet: QuestionSet = {
      _id: questionSet ? questionSet._id : undefined,
      title,
      description,
    }

    onSave(updatedQuestionSet)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6">
          {questionSet ? "Edit Question Set" : "Create New Question Set"}
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default QuestionSetModal
