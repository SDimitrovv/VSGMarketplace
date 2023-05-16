import { baseApi } from "../utils/baseApi";

const GetMyOrders = "getMyOrders";
const GetPendingOrders = "getPendingOrders";
const CreateOrder = "createOrder";

const user = JSON.parse(sessionStorage.getItem("user") as string);

const ordersServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetMyOrders]: builder.query({
            query: (email) => ({
                url: `/Order/MyOrders?email=${email}`,
                headers: { Authorization: `Bearer ${user.token}` },
            }),
        }),
        [GetPendingOrders]: builder.query({
            query: () => ({
                url: "/Order/PendingOrders",
                headers: { Authorization: `Bearer ${user.token}` },
            }),
        }),
        [CreateOrder]: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/Order",
                headers: { Authorization: `Bearer ${user.token}` },
                body: data,
            }),
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
    useGetPendingOrdersQuery
} = ordersServices;
