import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/types';

const baseURL = 'https://auto.loanvantage360.com/internship/EvaluationSystemStoyan/api';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
      headers.set('Authorization', `Bearer ${user.token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
});