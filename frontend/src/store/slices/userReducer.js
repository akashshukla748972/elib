import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLogedIn: false,
  isLoading: false,
  isError: false,
};

const userRouter = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {},
  reducers: {},
});

export const {} = userRouter.actions

export default userRouter.reducer


