const baseURL = "https://localhost:7089/api";

export const makeRequest = async ({
    path,
    method = "GET",
    data = {},
    headers = {},
}) => {
    try {
        const token = localStorage.getItem("token");

        const options = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                ...headers,
            },
        };

        // if (data) {
        //     options.body = JSON.stringify(data);
        // }

        const res = await fetch(baseURL + path, {
            method,
            ...options,
        });

        if (!res.ok) {
            return Promise.reject("Something went wrong!");
        }

        return res.json();
    } catch (err) {
        throw Error(err);
    }
};
