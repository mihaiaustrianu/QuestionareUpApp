import React, { useState } from "react"
import { login } from "./authSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Spinner } from "../../components/Spinner"
import { useNavigate } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material"
import { Button } from "@mui/material"

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

  let content

  if (status === "loading") {
    content = <Spinner text="Loading..." />
  } else if (status === "succeeded") {
    content = <p>Succesfully logged in</p>
  } else {
    content = (
      <div>
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
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          endIcon={<LoginIcon />}
        >
          Login
        </Button>
      </div>
    )
  }

  return <div className="login-container">{content}</div>
}

export default Login
