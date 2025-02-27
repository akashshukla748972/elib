import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userReducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
