import { makeRequest } from "./makeRequest.ts";
import { MarketplaceProduct, InventoryProduct } from "./types.ts";

export const loadMarketplace = async (): Promise<MarketplaceProduct[]> => {
    return makeRequest<MarketplaceProduct>({ path: "/Product/Marketplace" });
};

export const loadInventory = async (): Promise<InventoryProduct[]> => {
    return makeRequest<InventoryProduct>({ path: "/Product/Inventory" });
};

export const loadPendingOrders = async (): Promise<object[]> => {
    return makeRequest<object>({ path: "/Order/PendingOrders" });
};

export const loadMyOrders = async (email: string): Promise<object[]> => {
    return makeRequest<object>({ path: "/Order/MyOrders?email=" + email });
};

export const loadProduct = async (id: number): Promise<object> => {
    return makeRequest<object>({ path: "/Product/" + id });
};

export const createProduct = async (data: object): Promise<object> => {
    return makeRequest<object>({
        path: "/Product",
        method: "POST",
        data,
    });
};

export const editProduct = async (id: number, data: object): Promise<object> => {
    return makeRequest<object>({
        path: "/Product/" + id,
        method: "PUT",
        data,
    });
};

export const deleteProduct = async (id: number): Promise<object> => {
    return makeRequest<object>({
        path: "/Product/" + id,
        method: "DELETE",
    });
};

export const createOrder = async (data: object): Promise<object> => {
    return makeRequest<object>({
        path: "/Order",
        method: "POST",
        data,
    });
};

export const completeOrder = async (id: number): Promise<object> => {
    return makeRequest<object>({
        path: "/Order/Complete/" + id,
        method: "PUT",
        headers: { "content-type": "text/plain" }
    });
};

export const rejectOrder = async (id: number): Promise<object> => {
    return makeRequest<object>({
        path: `/Order/Reject/${id}`,
        method: "PUT",
    });
};

export const loadCategories = async (): Promise<object[]> => {
    return makeRequest<object>({ path: `/Category` });
};
