import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee, IEmployeesResponse } from 'types/types';

const baseUrl = 'https://sm-server.netlify.app/.netlify/functions/get_all_employees_data_from_bob';
const GetEmployees = 'getEmployees';

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    [GetEmployees]: builder.query<IEmployee[], void>({
      query: () => ({
        url: '',
        headers: {
          'x-token': 'vanessa&radostina',
        },
      }),
      transformResponse: (response: IEmployeesResponse) => response.employees
    }),
  }),
  keepUnusedDataFor: 86400,
});

export const { useGetEmployeesQuery } = userApi;
