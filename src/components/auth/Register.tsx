import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Link, useNavigate } from "react-router-dom"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { TextField, Typography, Box } from "@mui/material"
import { Button } from "@mui/material"
import Spinner from "../../components/common/Spinner"
import { register } from "../../features/auth/authSlice"
import { unwrapResult } from "@reduxjs/toolkit"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const { status } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const handleRegister = async () => {
    const registrationDetails = { username, password }
    try {
      const resultAction = await dispatch(register(registrationDetails))
      unwrapResult(resultAction)
      navigate("/login")
    } catch (error) {
      if (error.includes("Username is already taken.")) {
        window.alert("User already exists. Please choose a different username.")
      } else {
        console.error("Registration error:", error)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      window.alert("Passwords do not match!")
      return
    }

    handleRegister()
  }

  let content

  if (status === "loading") {
    content = <Spinner />
  } else if (status === "succeeded") {
    content = <p>Registration successful. Please login.</p>
  } else {
    content = (
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Register</Typography>
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
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mt={2}
        >
          <Typography>Already have an account?</Typography>
          <Button component={Link} to="/login">
            Login now
          </Button>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          endIcon={<PersonAddIcon />}
        >
          Register
        </Button>
      </form>
    )
  }

  return <div className="register-container">{content}</div>
}

export default Register
