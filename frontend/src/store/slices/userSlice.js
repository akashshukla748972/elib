import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
