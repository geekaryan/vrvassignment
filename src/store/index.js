import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./url";
import authSlice from "./auth";
import loginSlice from "./login";
import roleSlice from "./role";

const store = configureStore({
  reducer: {
    url: urlSlice.reducer,
    auth: authSlice.reducer,
    login: loginSlice.reducer,
    role: roleSlice.reducer,
  },
});

export default store;
