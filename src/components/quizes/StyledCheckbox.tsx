import React from "react"
import { Box, Chip, Typography } from "@mui/material"
import { useTheme } from "@mui/system"

interface StyledCheckboxInterface {
  id?: string
  isChecked: boolean
  onChange: (id) => void
  index: number
  text: string
}

const StyledCheckbox = ({
  id,
  isChecked,
  onChange,
  index,
  text,
}: StyledCheckboxInterface) => {
  const theme = useTheme()

  const handleOptionClick = () => {
    onChange(id)
  }

  return (
    <Box
      onClick={handleOptionClick}
      minWidth={"100%"}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        border: `1px solid ${
          isChecked ? theme.palette.primary.secondary : "#ccc"
        }`,
        backgroundColor: isChecked
          ? theme.palette.secondary.main
          : theme.palette.background.default,
        color: isChecked ? "white" : theme.palette.text.primary,
        padding: "8px",
        cursor: "pointer",
        marginBottom: "8px",
        "&:hover": {
          backgroundColor: isChecked
            ? theme.palette.secondary.main
            : theme.palette.background.default,
        },
      }}
    >
      <Chip
        variant="outlined"
        label={String.fromCharCode(65 + index)}
        sx={{
          display: "flex",
          marginRight: "8px",
          color: isChecked ? "#fff" : "default",
          fontWeight: "bold",
          border: "1.5px solid #ccc",
        }}
      />
      <Typography variant="body1">{text}</Typography>
    </Box>
  )
}

export default StyledCheckbox
