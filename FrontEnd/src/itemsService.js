import { makeRequest } from "./makeRequest.js";
const baseURL = "https://localhost:7089/api";

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
        const res = await fetch(baseURL + `/Picture/${1}?productId=${id}`, {
            method: "PUT",
            body: file,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};