import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginPage from "../features/auth/LoginPage"
import LandingPage from "../features/landing/LandingPage"
import { Box, Grid, Toolbar } from "@mui/material"
import QuestionsPage from "../features/question-set/QuestionSetsPage"
import QuizPage from "../features/quizes/QuizPage"
import QuestionListPage from "../features/questions/QuestionListPage"
import EditQuestionPage from "../features/questions/EditQuestionPage"
import CreateQuestionPage from "../features/questions/CreateQuestionPage"
import NewNavbar from "../components/navbar/NewNavabr"

const drawerWidth: number = 240

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <NewNavbar drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar></Toolbar>
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
        </Box>
      </Box>
    </BrowserRouter>
  )
}
