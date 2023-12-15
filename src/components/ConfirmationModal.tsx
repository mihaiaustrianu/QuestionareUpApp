import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this item?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={onConfirm} color="secondary">
          <Typography variant="button">Delete</Typography>
        </Button>
        <Button onClick={onClose} color="primary">
          <Typography variant="button">Cancel</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationModal
