import React from "react"
import { Modal, Box, Typography, Button } from "@mui/material"

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
        }}
      >
        <Typography variant="h6" id="delete-modal-title" gutterBottom>
          Delete Question Set
        </Typography>
        <Typography variant="body1" id="delete-modal-description">
          Are you sure you want to delete this question set?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            sx={{ marginLeft: 2 }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
