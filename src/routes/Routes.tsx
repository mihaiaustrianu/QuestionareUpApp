import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginPage from "../features/auth/LoginPage"
import LandingPage from "../features/landing/LandingPage"
import { Box, Toolbar } from "@mui/material"
import QuestionsPage from "../features/question-set/QuestionSetsPage"
import QuizMenuPage from "../features/quizes/QuizMenuPage"
import QuestionListPage from "../features/questions/QuestionListPage"
import EditQuestionPage from "../features/questions/EditQuestionPage"
import CreateQuestionPage from "../features/questions/CreateQuestionPage"
import NewNavbar from "../components/navbar/NewNavabr"
import QuizReviewPage from "../features/quizes/QuizReviewPage"
import QuizHistory from "../components/quizes/QuizHistory"

const drawerWidth: number = 220

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", height: "100vh" }}>
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
              path="/quizMenu"
              element={
                <PrivateRoute>
                  <QuizMenuPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/review/"
              element={
                <PrivateRoute>
                  <QuizHistory />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/review/:quizId"
              element={
                <PrivateRoute>
                  <QuizReviewPage />
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
              path="/edit-questionSet/:questionSetId/:questionId"
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
