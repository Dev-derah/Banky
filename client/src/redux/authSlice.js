import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
  },
  reducers: {
    userRegistered: (state, action) => {
      state.userId = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { userLoggedIn,userRegistered } = authSlice.actions;

export default authSlice.reducer;
