import { baseApi } from '../../api/baseApi';
import { TProduct } from '../../types/product';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ data: TProduct[]; meta: any }, Record<string, any>>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      providesTags: ['Product'],
    }),
    getSingleProduct: builder.query<TProduct, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi;
