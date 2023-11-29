import { blue, grey } from "@mui/material/colors"

export const textareaStyles = {
  width: "320px",
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "0.875rem",
  fontWeight: "400",
  lineHeight: "1.5",
  padding: "8px 12px",
  borderRadius: 8,
  color: grey[900], // Default color
  background: "#fff", // Default background color
  border: `1px solid ${grey[200]}`, // Default border color
  boxShadow: `0px 2px 2px ${grey[50]}`, // Default box shadow

  "&:hover": {
    borderColor: blue[400],
  },

  "&:focus": {
    borderColor: blue[400],
    boxShadow: `0 0 0 3px ${blue[200]}`,
  },

  // firefox
  "&:focusVisible": {
    outline: 0,
  },
}
