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
  typography: {
    title: string
    text: string
    actionLabel: string
  }
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  typography,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{typography?.title}</DialogTitle>
      <DialogContent>
        <Typography>{typography?.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={onConfirm} color="secondary">
          <Typography variant="button">{typography?.actionLabel}</Typography>
        </Button>
        <Button onClick={onClose} color="primary">
          <Typography variant="button">Cancel</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationModal
