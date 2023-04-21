import { makeRequest } from "./makeRequest.js";

export const loadMarketplace = async () => {
    const res = await makeRequest({ path: "/Product/Marketplace" });
    return await res.json();
};

export const loadInventory = async () => {
    const res = await makeRequest({ path: "/Product/Inventory" });
    return await res.json();
};

export const loadPendingOrders = async () => {
    const res = await makeRequest({ path: "/Order/PendingOrders" });
    return await res.json();
};

export const loadMyOrders = async (email) => {
    const res = await makeRequest({ path: "/Order/MyOrders?email=" + email });
    return await res.json();
};

export const loadProduct = async (id) => {
    const res = await makeRequest({ path: "/Product/" + id });
    return await res.json();
};

export const createProduct = async (data) => {
    const res = await makeRequest({
        path: "/Product",
        method: "POST",
        data,
    });
    return await res.json();
};

export const editProduct = async (id, data) => {
    const res = await makeRequest({
        path: "/Product/" + id,
        method: "PUT",
        data,
    });
    return res.json();
};

export const deleteProduct = async (id) => {
    const res = await makeRequest({
        path: "/Product/" + id,
        method: "DELETE",
    });
    return res;
};

export const createOrder = async (data) => {
    const res = await makeRequest({
        path: "/Order",
        method: "POST",
        data,
    });
    return res;
};

export const completeOrder = async (id) => {
    const res = await makeRequest({
        path: "/Order/Complete/" + id,
        method: "PUT",
    });
    return res;
};

export const rejectOrder = async (id) => {
    const res = await makeRequest({
        path: `/Order/Reject/${id}`,
        method: "PUT",
    });
    return res;
};

export const loadCategories = async () => {
    const res = await makeRequest({ path: `/Category` });
    return await res.json();
};
