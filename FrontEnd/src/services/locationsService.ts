import { ILocation } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetLocation = 'getLocation';

const locationsService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetLocation]: builder.query<ILocation[], void>({ query: () => '/Location' }),
        transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),

});

export const {
    useGetLocationQuery
} = locationsService;
