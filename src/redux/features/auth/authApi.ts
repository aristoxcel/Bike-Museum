import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllUserData: builder.query({
      query: () => ({
        url: "auth/admin/get-all-user-information",
      }),
    }),
    deactivateAccount: builder.mutation({
      query: (userInfo) => ({
        url: "auth/admin/block-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    activeAccount: builder.mutation({
      query: (userInfo) => ({
        url: "auth/admin/make-active-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    changeRole: builder.mutation({
      query: (userRole) => ({
        url: "auth/admin/change-user-role",
        method: "POST",
        body: userRole,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUserDataQuery,
  useDeactivateAccountMutation,
  useActiveAccountMutation,
  useChangeRoleMutation,
} = authApi;
