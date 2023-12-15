import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { removeToken, setToken } from "../../utils/HelperFunctions"

const serverURL = import.meta.env.VITE_SERVER_URL

const initialState = {
  userInfo: {
    username: "",
    id: "",
  },
  userToken: null,
  error: null,
  status: "idle",
}

export const login = createAsyncThunk("auth/login", async (payload: any) => {
  const response = await client.post(serverURL + "user/login", payload)
  setToken(response.data.token)
  return response.data
})

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeToken()
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { token, userInfo } = action.payload
        state.userToken = token
        state.userInfo = userInfo
        state.status = "succeeded"
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.userInfo = { username: "", id: "" }
        state.userToken = null
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.userToken = null
        state.status = "idle"
        state.userInfo = { username: "", id: "" }
      })
  },
})

export default authSlice.reducer
