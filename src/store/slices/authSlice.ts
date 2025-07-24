import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/apiTypes";



const initialState: AuthState = {
  user: null as User | null,
  isAuthenticated: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: User, accessToken?: string | null, refreshToken?: string | null }>,
    ) => {
      state.user = user
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  }
})

export const {
  setUser,
  clearUser,
} = authSlice.actions

export const authReducer = authSlice.reducer