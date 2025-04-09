// // src/redux/features/products/productApi.ts
// import { baseApi } from '../../api/baseApi';
// import { TProduct } from '../../types/product';

// export const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllProducts: builder.query<{
//       data: TProduct[];
//       meta?: {
//         total: number;
//         limit: number;
//         page: number;
//       };
//     }, Record<string, any>>({
//       query: (params) => ({
//         url: '/products',
//         method: 'GET',
//         params,
//       }),
//       providesTags: ['Product'],
//     }),

//     getSingleProduct: builder.query<TProduct, string>({
//       query: (id) => `/products/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Product', id }],
//     }),
//   }),
// });

// export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi;
