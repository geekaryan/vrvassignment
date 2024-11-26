import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./url";
import authSlice from "./auth";

const store = configureStore({
  reducer: {
    url: urlSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
