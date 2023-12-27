import React, { ReactNode } from "react"
import { Grid } from "@mui/material"

interface CommonLayoutProps {
  children: ReactNode
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
    >
      {children}
    </Grid>
  )
}

export default CommonLayout
