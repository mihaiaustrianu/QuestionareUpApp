import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Navbar from "../components/navbar/Navbar"
import LoginPage from "../features/auth/LoginPage"
import LandingPage from "../features/landing/LandingPage"
import { Grid } from "@mui/material"
import QuestionsPage from "../features/question-set/QuestionSetsPage"
import QuizPage from "../features/quizes/QuizPage"
import QuestionListPage from "../features/questions/QuestionListPage"
import EditQuestionPage from "../features/questions/EditQuestionPage"
import CreateQuestionPage from "../features/questions/CreateQuestionPage"

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Grid container height="100vh" display="flex" flexDirection="column">
        <Grid item height="7vh">
          <Navbar />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            flexDirection: "column",
          }}
          item
          height="93vh"
        >
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/questionnaireUp"
              element={
                <PrivateRoute>
                  <QuestionsPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/quizPage"
              element={
                <PrivateRoute>
                  <QuizPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/edit-questionSet/:questionSetId"
              element={
                <PrivateRoute>
                  <QuestionListPage></QuestionListPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-question/:questionId"
              element={
                <PrivateRoute>
                  <EditQuestionPage></EditQuestionPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/create-question"
              element={
                <PrivateRoute>
                  <CreateQuestionPage></CreateQuestionPage>
                </PrivateRoute>
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
