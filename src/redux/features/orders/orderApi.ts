import { baseApi } from "../../api/baseApi";


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/order",
        method: "POST",
        body: bookInfo,
      }),
    }),
    getAdminOrdersData: builder.query({
      query: (userEmail) => ({
        url: "/payment/get-admin-order-data",
        method: "PUT",
        body: { email: userEmail }, 
        headers: {
          "Content-Type": "application/json", 
        },
      }),
    }),
    getUserOrdersData: builder.query({
      query: (userId) => ({
        url: `/orders/get-user-order-data/${userId}`,
        method: "GET",
      }),
    }),

    acceptOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/payment/accept-order",
        method: "PUT",
        body: bookInfo,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (bookInfo) => ({
        url: "/payment/cancel-order",
        method: "PUT",
        body: bookInfo,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/delete-order",
        method: "PUT",
        body: orderInfo,
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAdminOrdersDataQuery,
  useGetUserOrdersDataQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
