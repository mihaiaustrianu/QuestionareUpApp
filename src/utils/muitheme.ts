import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7aacb3",
      dark: "#4c6e81",
      light: "#cf8da7",
    },
    secondary: {
      main: "#aa5377",
      dark: "#3b3759",
      light: "#4c6e81",
    },
    text: {
      primary: "#333333",
    },
    background: {
      default: "#F5F5F5",
    },
    success: {
      main: "#00C853",
    },
    error: {
      main: "#D50000",
    },
  },
})

export default theme
