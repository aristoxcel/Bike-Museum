import { baseApi } from '../../api/baseApi';
import {
  TProductResponse,
  TProductsResponse,
} from '../../types/product';

export type GetAllProductsParams = {
  page?: number;
  limit?: number;
  category?: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
 
};

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<TProductsResponse, GetAllProductsParams>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params, 
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
