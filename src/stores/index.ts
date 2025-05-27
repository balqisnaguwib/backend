// import
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import auth from "./auth";
import loading from "./loading";

const store = configureStore({
  reducer: {
    auth,
    loading,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
