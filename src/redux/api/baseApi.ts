// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://bike-museum-server-tan.vercel.app/api',
  }),
  tagTypes: ['Product'],
  endpoints: () => ({}),
});


//  http://localhost:5000/api
//  https://bike-museum-server-tan.vercel.app/api