import { ILendItem, IUserLentItems } from '../types/types';
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
            transformErrorResponse: () => 'Something went wrong... Try again',
        }),
        [CompleteLend]: builder.mutation<void, number>({
            query: (id) => ({
                method: 'PUT',
                url: '/Lend/Return/' + id,
            }),
            transformErrorResponse: () => 'Something went wrong... Try again',
        }),
    }),
});

export const {
    useGetMyLentItemsQuery,
    useGetLentItemsQuery,
    useCreateLendMutation,
    useCompleteLendMutation,
} = lendServices;
