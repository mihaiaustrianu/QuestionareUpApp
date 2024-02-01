import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import Spinner from "../components/common/Spinner"

const PrivateRoute = ({ children }) => {
  const userToken = localStorage.getItem("user_token")

  const authStatus = useAppSelector((state) => state.auth.status)
  const questionSetStatus = useAppSelector((state) => state.questionSet.status)
  const quizStatus = useAppSelector((state) => state.quiz.status)
  const quizHistoryStatus = useAppSelector((state) => state.quizHistory.status)
  const reviewedQuizStatus = useAppSelector(
    (state) => state.reviewedQuiz.status,
  )

  const isLoading =
    authStatus === "loading" ||
    questionSetStatus === "loading" ||
    quizStatus === "loading" ||
    quizHistoryStatus === "loading" ||
    reviewedQuizStatus === "loading"

  if (isLoading) {
    return <Spinner />
  }

  if (!userToken) {
    console.log("User not authenticated. Redirecting to /login")
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
