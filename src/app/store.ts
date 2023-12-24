import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import questionSetReducer from "../features/question-set/questionSetSlice"
import questionReducer from "../features/questions/questionsSlice"
import quizReducer from "../features/quizes/quizSlice"
import quizReviewReducer from "../features/quizes/quizReviewSlice"
import quizHistoryReducer from "../features/quiz-history/quizHistorySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    questionSet: questionSetReducer,
    question: questionReducer,
    quiz: quizReducer,
    reviewedQuiz: quizReviewReducer,
    quizHistory: quizHistoryReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
