// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bike-museum-server.vercel.app/api',
  }),
  tagTypes: ['Product'],
  endpoints: () => ({}),
});