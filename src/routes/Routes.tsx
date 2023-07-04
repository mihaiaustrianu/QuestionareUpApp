import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Home from "./Home"
import Navbar from "../components/Navbar"
import Login from "../features/auth/Login"
import LoginPage from "../features/auth/LoginPage"

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
    </BrowserRouter>
  )
}
