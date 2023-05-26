import { baseApiMiddleware } from "../utils/baseApiMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../utils/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, baseApiMiddleware),
  devTools: true
})

export default store;
