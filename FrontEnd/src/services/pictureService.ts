import { makeRequest } from "./makeRequest.ts";

export const createImage = async (id: number, file: FormData): Promise<string | void> => {
    const res = await makeRequest<Response>({
        path: "/Picture?productId=" + id,
        method: "POST",
        data: file,
    })
    return await res.text();
};

export const editImage = async (id: number, file: FormData): Promise<string | void> => {
    const res = await makeRequest<Response>({
        path: '/Picture/' + id,
        method: "PUT",
        data: file,
    })
    return await res.text();
};

export const deleteImage = async (id: number) => {
    return makeRequest({
        path: '/Picture/' + id,
        method: "DELETE",
    });
}