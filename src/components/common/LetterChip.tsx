import React from "react"

export default function LetterChip() {
  return (
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
  )
}
