import { makeRequest } from "./makeRequest.ts";
import { IProduct, ICategory, IOrder } from "./types.ts";

export const loadMarketplace = () => {
    return makeRequest<IProduct[]>({ path: "/Product/Marketplace" });
};

export const loadInventory = () => {
    return makeRequest<IProduct[]>({ path: "/Product/Inventory" })
};

export const loadPendingOrders = async () => {
    return makeRequest<IOrder[]>({ path: "/Order/PendingOrders" });
};

export const loadMyOrders = async (email: string) => {
    return makeRequest<IOrder[]>({ path: "/Order/MyOrders?email=" + email });
};

export const loadProduct = async (id: number) => {
    return makeRequest<IProduct>({ path: "/Product/" + id });
};

export const createProduct = async (data: object) => {
    return makeRequest<IProduct>({
        path: "/Product",
        method: "POST",
        data,
    });
};

export const editProduct = async (id: number, data: object) => {
    return makeRequest<IProduct>({
        path: "/Product/" + id,
        method: "PUT",
        data,
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
    });
};

export const completeOrder = async (id: number) => {
    return makeRequest<IOrder>({
        path: "/Order/Complete/" + id,
        method: "PUT",
        headers: { "content-type": "text/plain" }
    });
};

export const rejectOrder = async (id: number) => {
    return makeRequest<IOrder>({
        path: `/Order/Reject/${id}`,
        method: "PUT",
    });
};

export const loadCategories = async () => {
    return makeRequest<ICategory[]>({ path: `/Category` });
};
