import { createSlice } from "@reduxjs/toolkit";

const initialState = { login: false };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toogle(state) {
      state.login = !state.login;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
