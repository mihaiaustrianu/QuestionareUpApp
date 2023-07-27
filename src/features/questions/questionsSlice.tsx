import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { client } from "../../api/client"

const serverURL = import.meta.env.VITE_SERVER_URL

export interface Question {
  _id?: string
  questionSetId?: string // Add questionSetId to the Question interface
  title: string
  text: string
  answers: Answer[]
}

export interface Answer {
  answerText: string
  isCorrect: boolean
}

interface QuestionState {
  questions: Question[]
  status: string
  error: string | null
  questionSetId?: string // Add questionSetId to the state
}

const initialState: QuestionState = {
  questions: [],
  status: "idle",
  error: null,
  questionSetId: undefined,
}

// Async thunk to fetch user's questions
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (questionSetId: string) => {
    const response = await client.get(
      serverURL + `api/questions/${questionSetId}`,
    )
    return response.data
  },
)

// Async thunk to create a new question
export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (question: Question) => {
    const response = await client.post(
      serverURL + `api/questions/${question.questionSetId}`,
      question,
    )
    return response.data.newQuestion
  },
)

// Async thunk to delete a question
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId: string) => {
    await client.delete(serverURL + `api/questions/${questionId}`)
    return questionId
  },
)

// Async thunk to update a question
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (question: Question) => {
    await client.put(serverURL + `api/questions/${question._id}`, question)
    return question
  },
)

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionSetId: (state, action: PayloadAction<string>) => {
      state.questionSetId = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        state.questions = action.payload
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch questions."
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload,
        )
        state.status = "succeeded"
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const updatedQuestion = action.payload
        state.questions = state.questions.map((question) =>
          question._id === updatedQuestion._id ? updatedQuestion : question,
        )
        state.status = "succeeded"
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        state.questions.push(action.payload) // Add the newly created question to the state
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to create a question."
      })
  },
})

export const { setQuestionSetId } = questionSlice.actions // Export the action creator

export default questionSlice.reducer
