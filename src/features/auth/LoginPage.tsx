import React from "react"
import { styled } from "@mui/system"
import { Grid } from "@mui/material"
import Login from "./Login"

const ScreenContainer = styled(Grid)`
  height: 95vh;
`

const ImageContainer = styled(Grid)`
  background-image: url("src/images/loginImage.jpg");
  background-size: cover;
  background-position: center;
`

const LoginContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginPage = () => {
  return (
    <ScreenContainer container>
      <ImageContainer item xs={0} md={6} />
      <LoginContainer item xs={12} md={6}>
        <Login />
      </LoginContainer>
    </ScreenContainer>
  )
}

export default LoginPage
