import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Home from "./Home"
import Navbar from "../components/navbar/Navbar"
import LoginPage from "../features/auth/LoginPage"
import LandingPage from "../features/landing/LandingPage"
import { Box, Grid } from "@mui/material"

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Grid container height="100vh" display="flex" flexDirection="column">
        <Box height="5vh">
          <Navbar />
        </Box>
        <Grid container height="95vh" overflow="hidden">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/privateExample"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
