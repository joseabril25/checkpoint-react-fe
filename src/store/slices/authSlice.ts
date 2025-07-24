import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/apiTypes";



const initialState: AuthState = {
  user: null as User | null,
  isAuthenticated: true,
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUser: (
      state,
      { payload: { user, accessToken, refreshToken } }: PayloadAction<{ user: User, accessToken?: string | null, refreshToken?: string | null }>,
    ) => {
      state.user = user
      state.isAuthenticated = true
      state.accessToken = accessToken || null
      state.refreshToken = refreshToken || null
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
    },
  }
})

export const {
  setUser,
  clearUser,
} = authSlice.actions

export const authReducer = authSlice.reducer