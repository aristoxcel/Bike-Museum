import { baseApi } from '../../api/baseApi';
import {
  TProductResponse,
  TProductsResponse,
} from '../../types/product';

// Define the type for the parameters expected in the query
export type GetAllProductsParams = {
  page?: number;
  limit?: number;
  category?: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  // Add any other query parameters your API expects
};

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<TProductsResponse, GetAllProductsParams>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params, // Use the defined type for params
      }),
      providesTags: ['Product'],
    }),

    getSingleProduct: builder.query<TProductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id , result, error}],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi;
