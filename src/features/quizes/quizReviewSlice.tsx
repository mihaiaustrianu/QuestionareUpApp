import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Question } from "../questions/questionsSlice"
import { client } from "../../api/client"

const serverURL = import.meta.env.VITE_SERVER_URL

interface QuizReviewState {
  quizId: string | null
  questions: Question[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  quizScore: number | null
  userAnswers: { [questionId: string]: string[] }
}

const initialState: QuizReviewState = {
  quizId: null,
  questions: [],
  status: "idle",
  error: null,
  quizScore: null,
  userAnswers: {},
}

export const fetchQuiz = createAsyncThunk(
  "reviewedQuiz/fetchQuiz",
  async (quizId: string) => {
    const response = await client.get(serverURL + `api/quiz/${quizId}`)
    return response.data
  },
)

const quizReview = createSlice({
  name: "reviewedQuiz",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        console.log(action.payload)

        state.quizId = action.payload.quizId
        state.questions = action.payload.questions
        state.userAnswers = action.payload.userAnswers
        state.quizScore = action.payload.score
        state.questions = action.payload.questions
        state.quizScore = action.payload.score
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch quiz."
      })
  },
})

export default quizReview.reducer
