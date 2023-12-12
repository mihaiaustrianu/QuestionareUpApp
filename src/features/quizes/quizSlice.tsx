import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { Question } from "../questions/questionsSlice"

const serverURL = import.meta.env.VITE_SERVER_URL

interface QuizState {
  quizId: string | null
  questions: Question[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  quizScore: number | null
  userAnswers: Record<string, string[]>
}

const initialState: QuizState = {
  quizId: null,
  questions: [],
  status: "idle",
  error: null,
  quizScore: null,
  userAnswers: {},
}

interface CreateQuizPayload {
  questionSetIds: string[]
  numberOfQuestions: number
  userId: string
}

interface SubmitUserAnswersPayload {
  quizId: string
  userAnswers: Record<string, string[]>
}

export const createQuiz = createAsyncThunk(
  "activeQuiz/createQuiz",
  async (payload: CreateQuizPayload) => {
    const response = await client.post(serverURL + "api/quiz/create", payload)
    return response.data
  },
)

export const submitUserAnswers = createAsyncThunk(
  "activeQuiz/submitUserAnswers",
  async (payload: SubmitUserAnswersPayload) => {
    const response = await client.put(
      serverURL + `api/quiz/${payload.quizId}/submit`,
      { userAnswers: payload.userAnswers },
    )
    return response.data
  },
)

const quizSlice = createSlice({
  name: "activeQuiz",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        state.quizId = action.payload.quizId
        state.questions = action.payload.questions
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to create quiz."
      })
      .addCase(submitUserAnswers.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(submitUserAnswers.fulfilled, (state) => {
        state.status = "succeeded"
        state.error = null
      })
      .addCase(submitUserAnswers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to submit answers."
      })
  },
})

export default quizSlice.reducer
