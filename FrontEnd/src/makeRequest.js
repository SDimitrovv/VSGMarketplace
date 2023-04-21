const baseURL = "https://localhost:7089/api";

export const makeRequest = async ({
    path,
    method = "GET",
    data = {},
    headers = {},
}) => {
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (Object.keys(data).length > 0) {
            options.body = JSON.stringify(data);
        }

        const res = await fetch(baseURL + path, {
            method,
            ...options,
        });

        if (!res.ok) {
            return Promise.reject();
        }

        return res;
    } catch (err) {
        throw Error(err);
    }
};
