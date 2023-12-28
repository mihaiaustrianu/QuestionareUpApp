import { Box } from "@mui/material"
import React from "react"
import { useTheme } from "@mui/system"

interface CustomCardProps {
  children: React.ReactNode
  highlightColor?: string
}
export default function CustomCard({
  children,
  highlightColor,
}: CustomCardProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        position: "relative",
        padding: "15px",
        marginBottom: "16px",
        backgroundColor:
          (highlightColor && theme.palette[highlightColor]?.main) || "inherit",
      }}
    >
      {children}
    </Box>
  )
}
