import { ILendItem, IUserLentItems, IErrorResponse } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetMyLentItems = 'getMyLentItems';
const GetLentItems = 'getLentItems';
const CreateLend = 'createLend';
const CompleteLend = 'completeLend';

const lendServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetMyLentItems]: builder.query<ILendItem[], void>({ query: () => `/Lend/My-Lent-Items` }),
        [GetLentItems]: builder.query<IUserLentItems[], void>({ query: () => '/Lend/Lent-Items' }),
        [CreateLend]: builder.mutation<void, object>({
            query: (data) => ({
                method: 'POST',
                url: '/Lend',
                body: data,
            }),
            transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
        }),
        [CompleteLend]: builder.mutation<string, number>({
            query: (id) => ({
                method: 'PUT',
                url: '/Lend/Return/' + id,
                responseHandler: (response) => response.text()
            }),
            transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
        }),
    }),
});

export const {
    useGetMyLentItemsQuery,
    useGetLentItemsQuery,
    useCreateLendMutation,
    useCompleteLendMutation,
} = lendServices;
