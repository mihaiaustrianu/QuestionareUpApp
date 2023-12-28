import React from "react"
import CircularProgress from "@mui/material/CircularProgress"

const Spinner = ({ size = "5em" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh", // Make the container take the full height of the viewport
      }}
    >
      <CircularProgress size={size} />
    </div>
  )
}

export default Spinner
