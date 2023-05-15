const baseURL = "https://localhost:7089/api";

type RequestParams = {
    path: string;
    method?: string;
    data?: object | FormData;
    headers?: Record<string, string>;
}

export const makeRequest = async <T>({
    path,
    method = "GET",
    data = {},
    headers = {},
}: RequestParams): Promise<T> => {

    let options: { headers: Record<string, string>; body?: string | FormData }

    if (method !== "GET") {
        if (headers["Content-Type"] === "application/json") {
            options = {
                headers: {
                    ...headers,
                },
                body: JSON.stringify(data)
            }
        } else {
            options = {
                headers,
                body: data as FormData
            }
        }
    } else {
        options = {
            headers: {
                ...headers,
            }
        }
    }

    const user = JSON.parse(sessionStorage.getItem('user') as string);
    options.headers["Authorization"] = `Bearer ${user.token}`;

    try {
        const response = await fetch(baseURL + path, {
            method,
            ...options,
        });

        if (!response.ok) {
            throw new Error('Oops, something happened...');
        }

        const contentType = response.headers.get("content-type");
        return contentType === "application/json; charset=utf-8" ? await response.json() : response;
    } catch (error) {
        const responseError = error as T;
        console.error(responseError);
        return responseError;
    }
};
