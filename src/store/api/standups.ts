import { baseApi, baseQuery } from ".";
import type { Standup, CreateStandupRequest, StandupQuery, PaginatedApiResponse } from "../../types/apiTypes";

export const standupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStandups: builder.query<PaginatedApiResponse<Standup>, StandupQuery | void>({
      queryFn: async (params, api, extraOptions) => {
        const queryParams = new URLSearchParams();
        
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        
        const result = await baseQuery({
          url: `/standups?${queryParams.toString()}`,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        return { data: result.data as PaginatedApiResponse<Standup> };
      },
      providesTags: ['Standups'],
    }),
    
    getTodayStandups: builder.query<Standup[], void>({
      queryFn: async (_, api, extraOptions) => {
        const today = new Date().toISOString().split('T')[0];
        
        const result = await baseQuery({
          url: `/standups?date=${today}&limit=100`,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        const response = result.data as PaginatedApiResponse<Standup>;
        return { data: response.data };
      },
      providesTags: ['Standups'],
    }),
    
    createStandup: builder.mutation<Standup, CreateStandupRequest>({
      queryFn: async (standupData, api, extraOptions) => {
        const result = await baseQuery({
          url: '/standups',
          method: 'POST',
          body: standupData,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        return { data: result.data as Standup };
      },
      invalidatesTags: ['Standups'],
    }),
    
    getUserStandup: builder.query<Standup | null, { userId?: string; date?: string }>({
      queryFn: async ({ userId, date }, api, extraOptions) => {
        const queryParams = new URLSearchParams();
        if (userId) queryParams.append('userId', userId);
        if (date) queryParams.append('date', date);
        
        const result = await baseQuery({
          url: `/standups/user?${queryParams.toString()}`,
        }, api, extraOptions);
        
        if (result.error) {
          // If no standup found, return null instead of error
          if ('status' in result.error && result.error.status === 404) {
            return { data: null };
          }
          return { error: result.error };
        }
        
        return { data: result.data as Standup };
      },
      providesTags: ['Standups'],
    }),
  }),
});

export const {
  useGetStandupsQuery,
  useGetTodayStandupsQuery,
  useCreateStandupMutation,
  useGetUserStandupQuery,
} = standupsApi;