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
        url: "user/all",
      }),
    }),
    getUserByEmail: builder.query({
      query: (email: string) => {
        const token = localStorage.getItem('access_token'); 

        return {
          url: `user/getSingle/${email}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
        method: "PATCH",
        body: userInfo,
      }),
    }),
    changeRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `user/admin/change-user-role`, 
        method: 'PATCH',
        body: { id, role },  
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
