import React from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import "./Navbar.css"
import { signOut } from "../features/auth/authSlice"
import { Button, Grid, styled } from "@mui/material"

const ScreenContainer = styled(Grid)`
  height: 5vh;
`

const Navbar = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.userToken)

  const dispatch = useAppDispatch()

  const handleSingOut = () => {
    dispatch(signOut())
  }

  return (
    <ScreenContainer>
      <nav className="navbar">
        <Link to="/" className="navbar-title">
          QuestionareUpApp
        </Link>
        {isAuthenticated ? (
          <Button onClick={handleSingOut}>Sign out</Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </nav>
    </ScreenContainer>
  )
}

export default Navbar
