import { makeRequest } from "./makeRequest.ts";

const baseURL = "https://localhost:7089/api/Picture";

export const createImage = async (id: number, file: FormData): Promise<string | undefined> => {
    try {
        const res: Response = await fetch(baseURL + "?productId=" + id, {
            method: "POST",
            body: file,
        });
        return res.text();
    } catch (err) {
        console.error(err);
    }
};

export const editImage = async (id: number, file: FormData): Promise<string | undefined> => {
    try {
        const res: Response = await fetch(baseURL + '/' + id, {
            method: "PUT",
            body: file,
        });
        return res.text();
    } catch (err) {
        console.error(err);
    }
};

export const deleteImage = async (id: number) => {
    return makeRequest({
        path: '/Picture/' + id,
        method: "DELETE",
    });
}