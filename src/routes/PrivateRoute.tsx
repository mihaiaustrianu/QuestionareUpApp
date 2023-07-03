import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { Spinner } from "../components/Spinner"

const PrivateRoute = ({ children }) => {
  const { userToken, status } = useAppSelector((state) => state.auth)

  // if (status === "loading") {
  //   return <Spinner />
  // }

  if (!userToken) {
    return <Navigate to="/" replace />
  }
  return children
}

export default PrivateRoute
