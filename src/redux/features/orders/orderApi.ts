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
        url: "/orders",
        method: "PUT",
        body: { email: userEmail }, // object sent as email
        headers: {
          "Content-Type": "application/json", // JSON data send
        },
      }),
    }),
    getUserOrdersData: builder.mutation({
      query: (userId) => ({
        url: `orders/${userId}`,
        method: "POST",
        body: { userId }, // 👈 make sure you're sending this
      }),
    }),
    
    // 67fb984e996e2aaa8ea0e5bd
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
      query: (orderId: string) => ({
        url: `/orders/delete-order/${orderId}`,
        method: "DELETE",
      }),
    }),
    
  }),
});

export const {
  useAddOrderMutation,
  useGetAdminOrdersDataQuery,
  useGetUserOrdersDataMutation,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
