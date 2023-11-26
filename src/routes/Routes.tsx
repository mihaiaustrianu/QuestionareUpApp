import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Navbar from "../components/navbar/Navbar"
import LoginPage from "../features/auth/LoginPage"
import LandingPage from "../features/landing/LandingPage"
import { Grid } from "@mui/material"
import QuestionsPage from "../features/question-set/QuestionsPage"
import QuizPage from "../features/quizes/QuizPage"
import QuestionList from "../components/questions/QuestionList"

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Grid container height="100vh" display="flex" flexDirection="column">
        <Grid item height="7vh">
          <Navbar />
        </Grid>
        <Grid item height="93vh" overflow="scroll">
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
              path="/editQuestionSet/:questionSetId"
              element={
                <PrivateRoute>
                  <QuestionList></QuestionList>
                </PrivateRoute>
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
