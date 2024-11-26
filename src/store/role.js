import { createSlice } from "@reduxjs/toolkit";

const initialState = { role: "" };

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    add(state, actions) {
      state.role = state.role + actions.payload;
    },
    remove(state) {
      state.role = "";
    },
  },
});

export const roleActions = roleSlice.actions;
export default roleSlice;
