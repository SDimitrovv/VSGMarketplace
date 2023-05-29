import { ICategory } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetCategories = 'getCategories';

const categoriesServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetCategories]: builder.query<ICategory[], void>({ query: () => '/Category' })
    }),
});

export const {
    useGetCategoriesQuery
} = categoriesServices;
