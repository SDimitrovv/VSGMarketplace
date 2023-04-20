const baseURL = "https://localhost:7089/api/Picture";

export const createImage = async (id, file) => {
    try {
        const res = await fetch(baseURL + "?productId=" + id, {
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
        const res = await fetch(baseURL + '/' + id, {
            method: "PUT",
            body: file,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};