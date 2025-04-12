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
    getUserOrdersData: builder.query({
      query: (userEmail) => ({
        url: "/payment/get-user-order-data",
        method: "PUT",
        body: { email: userEmail }, // email sent as object
        headers: {
          "Content-Type": "application/json", // JSON data sender
        },
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
