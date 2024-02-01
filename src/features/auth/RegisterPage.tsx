import React from "react"
import { styled } from "@mui/system"
import { Grid } from "@mui/material"
import LoginIllustration from "../../svgs/LoginIllustration"
import Register from "../../components/auth/Register"

const ImageContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    display: none; /* Hide the image container from md breakpoint onwards */
  }
`

const RegisterContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const RegisterPage = () => {
  return (
    <Grid container>
      <ImageContainer item xs={12} md={6}>
        <LoginIllustration />
      </ImageContainer>
      <RegisterContainer item xs={12} md={6}>
        <Register />
      </RegisterContainer>
    </Grid>
  )
}

export default RegisterPage
