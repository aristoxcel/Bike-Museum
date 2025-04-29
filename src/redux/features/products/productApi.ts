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
      providesTags: (result, error, id) => [{ type: 'Product', id, result, error }],
    }),

    addProduct: builder.mutation<TProductResponse, Partial<TProductResponse>>({
      query: (product) => ({
        url: '/products/create-product',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<
      TProductResponse,
      { id: string; data: Partial<TProductResponse> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
