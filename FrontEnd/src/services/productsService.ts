import { baseApi } from "../utils/baseApi";

const GetMarketplace = "getMarketplace";
const GetInventory = "getInventory";
const CreateProduct = "createProduct";
const EditProduct = "editProduct";

// const GetProductsTag = "getProductsTag";

const user = JSON.parse(sessionStorage.getItem("user") as string);

const productsServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [GetMarketplace]: builder.query({
      query: () => ({
        url: "/Product/Marketplace",
        headers: { authorization: `Bearer ${user.token}` },
      }),
    }),
    [GetInventory]: builder.query({
      query: () => ({
        url: "/Product/Inventory",
        headers: { authorization: `Bearer ${user.token}` },
      }),
    }),
    [CreateProduct]: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/Product",
        headers: { authorization: `Bearer ${user.token}` },
        body: { ...data },
      }),
    }),
    [EditProduct]: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: "/Product/" + id,
        headers: { authorization: `Bearer ${user.token}` },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMarketplaceQuery,
  useGetInventoryQuery,
  useCreateProductMutation,
  useEditProductMutation
} = productsServices;
