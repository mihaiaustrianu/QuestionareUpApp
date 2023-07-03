import React, { useState } from "react"
import { login } from "./authSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Spinner } from "../../components/Spinner"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { status } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const loginDetails = { username, password }
    dispatch(login(loginDetails)).then(() => navigate("/home"))
  }

  let content

  if (status === "loading") {
    content = <Spinner text="Loading..." />
  } else if (status === "succeeded") {
    content = <p>Succesfully logged in</p>
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {content}
    </div>
  )
}

export default Login
