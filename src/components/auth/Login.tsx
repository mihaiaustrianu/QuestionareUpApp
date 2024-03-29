import React, { useState } from "react"
import { login } from "../../features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, useNavigate } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material"
import { Button } from "@mui/material"
import Spinner from "../common/Spinner"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()

  const { status } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const loginDetails = { username, password }
    dispatch(login(loginDetails)).then(() => navigate("/questionnaireUp"))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    handleLogin()
  }

  let content

  if (status === "loading") {
    content = <Spinner />
  } else if (status === "succeeded") {
    content = <p>Succesfully logged in</p>
  } else {
    content = (
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Login</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Remember Me"
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mt={2}
        >
          <Typography>Don't have an account?</Typography>
          <Button component={Link} to="/register">
            Register now
          </Button>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          endIcon={<LoginIcon />}
        >
          Login
        </Button>
      </form>
    )
  }

  return <div className="login-container">{content}</div>
}

export default Login
