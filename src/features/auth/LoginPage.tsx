import { styled } from "@mui/system"
import { Grid } from "@mui/material"
import Login from "../../components/auth/Login"
import LoginIllustration from "../../svgs/LoginIllustration"

const ImageContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    display: none; /* Hide the image container from md breakpoint onwards */
  }
`

const LoginContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginPage = () => {
  return (
    <Grid container>
      <ImageContainer item xs={12} md={6}>
        <LoginIllustration />
      </ImageContainer>
      <LoginContainer item xs={12} md={6}>
        <Login />
      </LoginContainer>
    </Grid>
  )
}

export default LoginPage
