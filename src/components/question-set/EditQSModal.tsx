import React from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { QuestionSet } from "../../features/question/questionsSlice"

interface EditQuestionSetModalProps {
  open: boolean
  questionSet: QuestionSet | null
  onClose: () => void
  onSave: (updatedQuestionSet: QuestionSet) => void
}

const EditQuestionSetModal: React.FC<EditQuestionSetModalProps> = ({
  open,
  questionSet,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (questionSet) {
      setTitle(questionSet.title)
      setDescription(questionSet.description)
    }
  }, [questionSet])

  const handleSave = () => {
    if (questionSet) {
      onSave({
        ...questionSet,
        title,
        description,
      })
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h6">Edit Question Set</Typography>
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

export default EditQuestionSetModal
