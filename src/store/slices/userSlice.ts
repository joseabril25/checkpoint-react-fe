import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Standup, User, UsersState } from "../../types/apiTypes";



const initialState: UsersState = {
  users: [] as User[],
  userStandups: [] as Standup[]
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
    setUserStandups: (state, action: PayloadAction<Standup[]>) => {
      state.userStandups = action.payload;
    },
    clearUserStandups: (state) => {
      state.userStandups = [];
    }
  }
})

export const {
  setUsers,
  clearUsers,
  setUserStandups,
  clearUserStandups
} = usersSlice.actions

export const usersReducer = usersSlice.reducer