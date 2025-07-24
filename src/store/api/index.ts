import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API setup - empty endpoints, will be injected by features
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1',
    credentials: 'include', // This ensures cookies are sent with requests
  }),
  tagTypes: ['User', 'Auth', 'Standups'],
  endpoints: () => ({}), // No endpoints defined here, will be injected later
});

// Export hooks for usage in functional components
// All hooks are exported from individual API files (providersApi, etc.)