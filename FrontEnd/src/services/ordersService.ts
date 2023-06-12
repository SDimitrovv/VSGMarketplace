import { IOrder, IErrorResponse } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetMyOrders = 'getMyOrders';
const GetPendingOrders = 'getPendingOrders';
const CreateOrder = 'createOrder';
const CompleteOrder = 'completeOrder';
const RejectOrder = 'rejectOrder';

const ordersServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetMyOrders]: builder.query<IOrder[], void>({ query: () => `/Order/My-Orders` }),
        [GetPendingOrders]: builder.query<IOrder[], void>({ query: () => '/Order/Pending-Orders' }),
        [CreateOrder]: builder.mutation<void, object>({
            query: (data) => ({
                method: 'POST',
                url: '/Order',
                body: data,
            }),
            transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
        }),
        [CompleteOrder]: builder.mutation<void, number>({
            query: (id) => ({
                method: 'PUT',
                url: '/Order/Complete/' + id,
            }),
            transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
        }),
        [RejectOrder]: builder.mutation<void, number>({
            query: (id) => ({
                method: 'PUT',
                url: '/Order/Reject/' + id,
            }),
            transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
    useGetPendingOrdersQuery,
    useCreateOrderMutation,
    useCompleteOrderMutation,
    useRejectOrderMutation
} = ordersServices;
