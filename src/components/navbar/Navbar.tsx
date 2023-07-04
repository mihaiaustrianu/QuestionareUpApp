import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { signOut } from "../../features/auth/authSlice"
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"

const Navbar = () => {
  const location = useLocation()
  const showNavbar = location.pathname !== "/"
  const isAuthenticated = useAppSelector((state) => state.auth.userToken)

  const dispatch = useAppDispatch()

  const handleSingOut = () => {
    dispatch(signOut())
  }

  if (showNavbar)
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" component={Link} to="/" color="inherit">
                QuestionnaireUpApp
              </Typography>
            </Grid>
            <Grid item>
              {isAuthenticated ? (
                <Button color="inherit" onClick={handleSingOut}>
                  Sign Out
                </Button>
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar
