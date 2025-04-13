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
        body: { email: userEmail }, // object sent as email
        headers: {
          "Content-Type": "application/json", // JSON data send
        },
      }),
    }),
    getUserOrdersData: builder.mutation({
      query: (userId) => ({
        url: "/orders/get-user-order-data",
        method: "POST",
        body: { userId }, // 👈 make sure you're sending this
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
      query: (orderId: string) => ({
        url: `/orders/delete-order?ProductId=${orderId}`,
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
