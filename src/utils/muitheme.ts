import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7E30E1",
      dark: "#49108B",
      light: "#A764F3",
    },
    secondary: {
      main: "#E26EE5",
      dark: "#C155D0",
      light: "#EC8EFF",
    },
    text: {
      primary: "#333333",
    },
    background: {
      default: "#F3F8FF",
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
