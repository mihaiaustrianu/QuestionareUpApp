import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { signOut } from "../../features/auth/authSlice"
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"

import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"

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
      <AppBar position="static" sx={{ height: "7vh" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h6"
                component={Link}
                to={isAuthenticated ? "/questionnaireUp" : "/"}
                color="inherit"
              >
                QuestionnaireUpApp
              </Typography>
            </Grid>
            <Grid item>
              {isAuthenticated ? (
                <Button
                  color="inherit"
                  onClick={handleSingOut}
                  endIcon={<LogoutIcon />}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  component={Link}
                  to="/login"
                  endIcon={<LoginIcon />}
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
