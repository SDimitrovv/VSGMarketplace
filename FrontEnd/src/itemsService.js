import { makeRequest } from "./makeRequest.js";
const baseURL = "https://localhost:7089/api";

export const loadPendingOrders = async () => {
    try {
        const data = await makeRequest({ path: "/Order/PendingOrders" });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const loadMyOrders = async (email) => {
    try {
        const data = await makeRequest({ path: "/Order/MyOrders?email=" + email });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const createOrder = async (data) => {
    try {
        const res = await fetch(baseURL + "/Order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const loadMarketplace = async () => {
    try {
        const data = await makeRequest({ path: "/Product/Marketplace" });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const loadInventory = async () => {
    try {
        const data = await makeRequest({ path: "/Product/Inventory" });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const loadProduct = async (id) => {
    try {
        const data = await makeRequest({ path: "/Product/" + id });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const createProduct = async (data) => {
    try {
        const res = await fetch(baseURL + "/Product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const editProduct = async (id, data) => {
    try {
        const res = await fetch(baseURL + "/Product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await fetch(baseURL + "/Product/" + id, {
            method: "DELETE"
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const createImage = async (id, file) => {
    try {
        const res = await fetch(baseURL + "/Picture?productId=" + id, {
            method: "POST",
            body: file,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export const editImage = async (id, file) => {
    try {
        const res = await fetch(baseURL + `/Picture/${id}`, {
            method: "PUT",
            body: file,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};