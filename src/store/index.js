import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./url";

const store = configureStore({
  reducer: {
    url: urlSlice.reducer,
  },
});

export default store;
