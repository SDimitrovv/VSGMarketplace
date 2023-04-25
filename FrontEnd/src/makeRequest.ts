const baseURL = "https://localhost:7089/api";

interface RequestParams {
    path: string;
    method?: string;
    data?: object;
    headers?: Record<string, string>;
}

export const makeRequest = async <T>({
    path,
    method = "GET",
    data = {},
    headers = { "Content-Type": "application/json" },
}: RequestParams): Promise<T[]> => {

    const options: { headers: Record<string, string>; body?: string } = {
        headers,
    };

    if (Object.keys(data).length > 0) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(baseURL + path, {
            method,
            ...options,
        });

        if (!response.ok) {
            throw new Error('Oops, something happened...');
        }

        const contentType = response.headers.get("content-type");
        return contentType ? await response.json() : response;
    } catch (error) {
        const responseError = error as T[];
        // if (responseError.ErrorMessage) {
        //     console.error(`Error: ${responseError.ErrorMessage}`);
        // }
        console.error(responseError);
        return responseError;
    }
};
