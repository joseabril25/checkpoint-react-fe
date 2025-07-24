import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StandupState, Standup } from "../../types/apiTypes";

const initialState: StandupState = {
  standups: [] as Standup[],
  currentStandup: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false
  }
}

const standupSlice = createSlice({
  name: 'standup',
  initialState,
  reducers: {
    setStandups: (state, action: PayloadAction<Standup[]>) => {
      state.standups = action.payload;
    },
    setCurrentStandup: (state, action: PayloadAction<Standup | null>) => {
      state.currentStandup = action.payload;
    },
    setPagination: (state, action: PayloadAction<{
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    }>) => {
      state.pagination = action.payload;
    },
  }
})

export const {
  setStandups,
  setCurrentStandup,
  setPagination
} = standupSlice.actions

export const standupReducer = standupSlice.reducer