import { baseApi } from "../utils/baseApi";

const GetCategories = "getCategories";

const user = JSON.parse(sessionStorage.getItem("user") as string);

const categoriesServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetCategories]: builder.query({
            query: () => ({
                url: "/Category",
                headers: { Authorization: `Bearer ${user.token}` },
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery
} = categoriesServices;
