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
      }),
    }),
    getAllUserData: builder.query({
      query: () => ({
        url: "auth/admin/all",
      }),
    }),
    getUserByEmail: builder.query({
      query: (email: string) => {
        // Get the token from localStorage or wherever it's stored
        const token = localStorage.getItem('access_token'); // Change this based on your storage method

        return {
          url: `user/getSingle/${email}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        };
      },
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
  useGetUserByEmailQuery,
} = authApi;
