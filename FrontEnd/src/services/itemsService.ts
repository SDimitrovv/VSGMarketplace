import { makeRequest } from "./makeRequest.ts";
import { IProduct, IOrder } from "../types/types.ts";

export const createProduct = async (data: object) => {
    return makeRequest<IProduct>({
        path: "/Product",
        method: "POST",
        data,
        headers: { "Content-Type": "application/json" },
    });
};

export const editProduct = async (id: number, data: object) => {
    return makeRequest<IProduct>({
        path: "/Product/" + id,
        method: "PUT",
        data,
        headers: { "Content-Type": "application/json" },
    });
};

export const deleteProduct = async (id: number) => {
    return makeRequest<IProduct>({
        path: "/Product/" + id,
        method: "DELETE",
    });
};

export const createOrder = async (data: object) => {
    return makeRequest<IOrder>({
        path: "/Order",
        method: "POST",
        data,
        headers: { "Content-Type": "application/json" },
    });
};

export const completeOrder = async (id: number) => {
    return makeRequest<IOrder>({
        path: "/Order/Complete/" + id,
        method: "PUT",
    });
};

export const rejectOrder = async (id: number) => {
    return makeRequest<IOrder>({
        path: `/Order/Reject/${id}`,
        method: "PUT",
    });
};