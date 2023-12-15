import { Box } from "@mui/material"
import React from "react"

interface CustomCardProps {
  children: React.ReactNode
}
export default function CustomCard({ children }: CustomCardProps) {
  return (
    <Box
      sx={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        position: "relative",
        padding: "15px",
        marginBottom: "16px",
      }}
    >
      {children}
    </Box>
  )
}
