import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"

const serverURL = import.meta.env.VITE_SERVER_URL

export interface QuestionSet {
  _id: string
  title: string
  description: string
}

interface QuestionState {
  questionSets: QuestionSet[]
  status: string
  error: string | null
}

const initialState: QuestionState = {
  questionSets: [],
  status: "idle",
  error: null,
}

export const createQuestionSet = createAsyncThunk(
  "question/createQuestionSet",
  async (payload: any) => {
    const response = await client.post(
      serverURL + "api/question-sets/create",
      payload,
    )
    return response.data
  },
)

// Async thunk to fetch question sets
export const fetchQuestionSets = createAsyncThunk(
  "question/fetchQuestionSets",
  async () => {
    const response = await client.get(serverURL + "api/question-sets")
    return response.data
  },
)

export const deleteQuestionSet = createAsyncThunk(
  "question/deleteQuestionSet",
  async (questionSetId: string) => {
    await client.delete(serverURL + `api/question-sets/${questionSetId}`)
    return questionSetId
  },
)

export const updateQuestionSet = createAsyncThunk(
  "question/updateQuestionSet",
  async (questionSet: QuestionSet) => {
    await client.put(
      serverURL + `api/question-sets/${questionSet._id}`,
      questionSet,
    )
    return questionSet
  },
)

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createQuestionSet.fulfilled, (state, action) => {
        const { _id, title, description } = action.payload
        const newQuestionSet: QuestionSet = {
          _id,
          title,
          description,
        }

        state.questionSets.push(newQuestionSet)
        state.status = "succeded"
      })
      .addCase(fetchQuestionSets.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchQuestionSets.fulfilled, (state, action) => {
        state.status = "succeded"
        state.error = null
        state.questionSets = action.payload
      })
      .addCase(fetchQuestionSets.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch question sets."
      })
      .addCase(deleteQuestionSet.fulfilled, (state, action) => {
        state.questionSets = state.questionSets.filter(
          (questionSet) => questionSet._id !== action.payload,
        )
        state.status = "succeeded"
      })
      .addCase(deleteQuestionSet.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(updateQuestionSet.fulfilled, (state, action) => {
        const updatedQuestionSet = action.payload
        const index = state.questionSets.findIndex(
          (questionSet) => questionSet._id === updatedQuestionSet._id,
        )
        if (index !== -1) {
          state.questionSets[index] = updatedQuestionSet
        }
        state.status = "succeeded"
      })
      .addCase(updateQuestionSet.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default questionSlice.reducer
