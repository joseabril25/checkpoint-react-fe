import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include',
});

// Base API setup - empty endpoints, will be injected by features
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Auth', 'Standups'],
  endpoints: () => ({}), // No endpoints defined here, will be injected later
});
