import { makeRequest } from "./makeRequest.js";

export const loadPendingOrders = async () => {
    try {
        const res = await makeRequest({ path: "/Order/PendingOrders" });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const loadMyOrders = async (email) => {
    try {
        const res = await makeRequest({ path: "/Order/MyOrders?email=" + email });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const createOrder = async (data) => {
    try {
        const res = await makeRequest({
            path: "/Order",
            method: "POST",
            data
        })

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const loadMarketplace = async () => {
    try {
        const res = await makeRequest({ path: "/Product/Marketplace" });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const loadInventory = async () => {
    try {
        const res = await makeRequest({ path: "/Product/Inventory" });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const loadProduct = async (id) => {
    try {
        const res = await makeRequest({ path: "/Product/" + id });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const createProduct = async (data) => {
    try {
        const res = await makeRequest({
            path: "/Product",
            method: "POST",
            data,
        });

        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const editProduct = async (id, data) => {
    try {
        const res = await makeRequest({
            path: "/Product/" + id,
            method: "PUT",
            data,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await makeRequest({
            path: "/Product/" + id,
            method: "DELETE"
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const completeOrder = async (id) => {
    try {
        const res = await makeRequest({
            path: "/Order/Complete/" + id,
            method: "PUT"
        });

        return res;
    } catch (err) {
        console.error(err);
    }
}

export const rejectOrder = async (id) => {
    try {
        const res = await makeRequest({
            path: `/Order/Reject/${id}`,
            method: "PUT",
        });

        return res;
    } catch (err) {
        console.error(err);
    }
}

export const loadCategories = async () => {
    try {
        const res = await makeRequest({ path: `/Category` });

        return await res.json();
    } catch (err) {
        console.error(err);
    }
}