import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "" };

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    add(state, action) {
      state.id = state.id + action.payload;
    },
    remove(state) {
      state.id = "";
    },
  },
});

export const urlActions = urlSlice.actions;

export default urlSlice;
