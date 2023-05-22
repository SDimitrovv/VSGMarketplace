import { baseApiMiddleware } from "../utils/baseApiMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../utils/baseApi";
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, baseApiMiddleware),
  devTools: true
})

export default store;
