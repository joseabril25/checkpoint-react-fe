import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersState } from "../../types/apiTypes";



const initialState: UsersState = {
  users: [] as User[],
}

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUsers: (
      state,
      { payload: { user } }: PayloadAction<{ user: User[]}>,
    ) => {
      state.users = user
    },
    clearUsers: (state) => {
      state.users = []
    },
  }
})

export const {
  setUsers,
  clearUsers,
} = usersSlice.actions

export const usersReducer = usersSlice.reducer