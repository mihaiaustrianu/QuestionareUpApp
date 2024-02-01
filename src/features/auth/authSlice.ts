import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { removeToken, setToken, getToken } from "../../utils/HelperFunctions"

const serverURL = import.meta.env.VITE_SERVER_URL

interface LoginPayload {
  username: string
  password: string
}

const initialState = {
  userInfo: {
    username: "",
    id: "",
  },
  userToken: null,
  error: null,
  status: "idle",
}

export const register = createAsyncThunk(
  "auth/register",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await client.post(serverURL + "user/signup", payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.data.error)
    }
  },
)

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    const response = await client.post(serverURL + "user/login", payload)
    setToken(response.data.token)
    return response.data
  },
)

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeToken()
})

export const autoLogin = createAsyncThunk("auth/autoLogin", async () => {
  const token = getToken()
  if (token) {
    const response = await client.post(serverURL + "api/quiz/validateToken", {
      token,
    })
    if (response.data.userId) {
      const userId = response.data.userId
      return { token, userId }
    } else {
      removeToken()
      throw new Error("Invalid token")
    }
  } else {
    throw new Error("No token found")
  }
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
      .addCase(autoLogin.fulfilled, (state, action) => {
        const { token, userId } = action.payload
        state.userToken = token
        state.userInfo.id = userId
        state.status = "succeeded"
      })
      .addCase(autoLogin.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.status = "idle"
        state.userToken = null
        removeToken()
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error
      })
      .addCase(register.pending, (state, action) => {
        state.status = "loading"
      })
  },
})

export default authSlice.reducer
