import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseUrl = () => {
  // In development, use proxy
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  // In production, use full URL
  return `${import.meta.env.VITE_API_URL}/api/v1`;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: 'include',
});

// Base API setup - empty endpoints, will be injected by features
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Users', 'Auth', 'Standups'],
  endpoints: () => ({}), // No endpoints defined here, will be injected later
});
