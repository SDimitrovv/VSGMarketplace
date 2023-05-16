import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = "https://localhost:7089/api";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery(({ baseUrl: baseURL })),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
});