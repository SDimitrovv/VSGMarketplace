import { IOrder } from "../types/types";
import { baseApi } from "../utils/baseApi";

const GetMyOrders = "getMyOrders";
const GetPendingOrders = "getPendingOrders";
const CreateOrder = "createOrder";
const CompleteOrder = "completeOrder";
const RejectOrder = "rejectOrder";

const ordersServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetMyOrders]: builder.query<IOrder[], void>({ query: () => `/Order/My-Orders` }),
        [GetPendingOrders]: builder.query<IOrder[], void>({ query: () => "/Order/Pending-Orders" }),
        [CreateOrder]: builder.mutation<void, object>({
            query: (data) => ({
                method: "POST",
                url: "/Order",
                body: data,
            }),
            transformErrorResponse: () => 'Something went wrong... Try again',
        }),
        [CompleteOrder]: builder.mutation<void, number>({
            query: (id) => ({
                method: "PUT",
                url: "/Order/Complete/" + id,
            }),
            transformErrorResponse: () => 'Something went wrong... Try again',
        }),
        [RejectOrder]: builder.mutation<void, number>({
            query: (id) => ({
                method: "PUT",
                url: "/Order/Reject/" + id,
            }),
            transformErrorResponse: () => 'Something went wrong... Try again',
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
