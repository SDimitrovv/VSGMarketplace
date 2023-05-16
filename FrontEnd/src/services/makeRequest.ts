const baseURL = "https://localhost:7089/api";

type RequestParams = {
    path: string;
    method?: string;
    data?: object | FormData;
    headers?: Record<string, string>;
};

export const makeRequest = async <T>({
    path,
    method = "GET",
    data = {},
    headers = {},
}: RequestParams): Promise<T> => {

    const user = JSON.parse(sessionStorage.getItem("user") as string);
    const options: { headers: Record<string, string>; body?: string | FormData } =
        { headers: { Authorization: `Bearer ${user.token}`, ...headers } };

    if (method !== "GET") {
        if (headers["Content-Type"] === "application/json") {
            options.body = JSON.stringify(data);
        } else {
            options.body = data as FormData;
        }
    }

    try {
        const response = await fetch(baseURL + path, {
            method,
            ...options,
        });

        if (!response.ok) {
            throw new Error("Oops, something happened...");
        }

        const contentType = response.headers.get("content-type");
        return contentType?.includes("application/json")
            ? await response.json()
            : response;
    } catch (error) {
        const responseError = error as T;
        console.error(responseError);
        return responseError;
    }
};
