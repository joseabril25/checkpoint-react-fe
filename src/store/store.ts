import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api";
import { authReducer } from "./slices/authSlice";
import { standupReducer } from "./slices/standupSlice";
import { usersReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    standup: standupReducer,
    users: usersReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;