import { makeRequest } from "./makeRequest.js";

export const loadProducts = async () => {
    try {
        const data = await makeRequest({ path: "/products" });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const loadProduct = async (id) => {
    try {
        const data = await makeRequest({ path: "/products/" + id });
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const createProduct = async (data) => {
    try {
        const res = await makeRequest({
            path: "/products",
            method: "POST",
            data,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};