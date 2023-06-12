import { IErrorResponse, IFormInputs, IProduct } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetMarketplace = 'getMarketplace';
const GetInventory = 'getInventory';
const CreateProduct = 'createProduct';
const EditProduct = 'editProduct';
const DeleteProduct = 'deleteProduct';

// const GetProductsTag = 'getProductsTag';

const productsServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [GetMarketplace]: builder.query<IProduct[], void>({ query: () => '/Product/Marketplace' }),
    [GetInventory]: builder.query<IProduct[], void>({ query: () => '/Product/Inventory' }),
    [CreateProduct]: builder.mutation<IProduct, IFormInputs>({
      query: (data) => ({
        method: 'POST',
        url: '/Product',
        body: data,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
    [EditProduct]: builder.mutation<IProduct, { id: number, data: IFormInputs }>({
      query: ({ id, data }) => ({
        method: 'PUT',
        url: '/Product/' + id,
        body: data,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
    [DeleteProduct]: builder.mutation<void, number>({
      query: (id) => ({
        method: 'DELETE',
        url: '/Product/' + id,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
  }),
});

export const {
  useGetMarketplaceQuery,
  useGetInventoryQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation
} = productsServices;
