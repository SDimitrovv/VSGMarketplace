import { baseApiMiddleware } from '../utils/baseApiMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../utils/baseApi';
import { userApi } from '../utils/userApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, baseApiMiddleware, userApi.middleware),
  devTools: true
})

export default store;