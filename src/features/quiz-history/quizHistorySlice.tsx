import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { QuizInterface } from "../quizes/quizSlice"

const serverURL = import.meta.env.VITE_SERVER_URL
interface HistoryState {
  quizes: QuizInterface[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: HistoryState = {
  quizes: [],
  status: "idle",
  error: null,
}

export const fetchQuizes = createAsyncThunk("quizes/fetchQuizes", async () => {
  const response = await client.get(serverURL + "api/quiz")
  return response.data
})

const quizHistory = createSlice({
  name: "quizHistory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuizes.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        state.quizes = action.payload
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch user quizes."
      })
  },
})

export default quizHistory.reducer
