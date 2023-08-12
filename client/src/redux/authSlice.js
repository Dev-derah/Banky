import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    userRegistered: (state, action) => {
      state.token = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { userLoggedIn,userRegistered } = authSlice.actions;

export default authSlice.reducer;
