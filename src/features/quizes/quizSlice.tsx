import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { Question } from "../questions/questionsSlice"

const serverURL = import.meta.env.VITE_SERVER_URL
export interface QuizInterface {
  _id: string | null
  questions: Question[]
  userAnswers: { [questionId: string]: string[] }
  submissionDate: Date | null
  quizScore: number | null
  startTime: number | null
  endTime: number | null
}
export interface UserAnswers {
  [questionId: string]: string[]
}

interface QuizState {
  currentQuiz: QuizInterface
  timeToSolve: number
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: QuizState = {
  currentQuiz: {
    _id: null,
    questions: [],
    userAnswers: {},
    submissionDate: null,
    quizScore: null,
    startTime: null,
    endTime: null,
  },
  timeToSolve: 0,
  status: "idle",
  error: null,
}

interface CreateQuizPayload {
  questionSetIds: string[]
  numberOfQuestions: number
  userId: string
  timeToSolve: number
}

interface SubmitUserAnswersPayload {
  quizId: string
  userAnswers: UserAnswers
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
  reducers: {
    setUserAnswers: (state, action: PayloadAction<UserAnswers>) => {
      state.currentQuiz.userAnswers = action.payload
    },
    resetQuiz: (state) => {
      state.currentQuiz = initialState.currentQuiz
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        console.log(action.payload)

        state.currentQuiz._id = action.payload.quizId
        state.currentQuiz.questions = action.payload.questions
        state.currentQuiz.startTime = action.payload.startTime
        state.currentQuiz.endTime = action.payload.endTime
        state.currentQuiz.userAnswers = {}
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
        state.currentQuiz.endTime = null
        state.error = null
      })
      .addCase(submitUserAnswers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to submit answers."
      })
  },
})

export const { setUserAnswers, resetQuiz } = quizSlice.actions

export default quizSlice.reducer
