import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUserData: builder.query({
      query: () => ({
        url: "/api/auth/admin/get-all-user-information",
      }),
    }),
    deactivateAccount: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/admin/block-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    activeAccount: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/admin/make-active-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    changeRole: builder.mutation({
      query: (userRole) => ({
        url: "/api/auth/admin/change-user-role",
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
