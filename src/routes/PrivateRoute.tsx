import React from "react"
import { Navigate } from "react-router-dom"
import { Spinner } from "../components/common/Spinner"
import { useAppSelector } from "../app/hooks"

const PrivateRoute = ({ children }) => {
  const userToken = localStorage.getItem("user_token")
  const status = useAppSelector((state) => state.auth.status)

  if (status === "loading") {
    return <Spinner />
  }

  if (!userToken) {
    console.log("User not authenticated. Redirecting to /login")
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
