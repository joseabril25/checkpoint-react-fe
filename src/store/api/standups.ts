import { baseApi, baseQuery } from ".";
import { setStandups, setPagination, setCurrentStandup } from "../slices/standupSlice";
import type { RootState } from "../store";
import type { Standup, CreateStandupRequest, StandupQuery, PaginatedApiResponse } from "../../types/apiTypes";
import { setUserStandups } from "../slices/userSlice";

export const standupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStandups: builder.query<PaginatedApiResponse<Standup>, StandupQuery | void>({
      queryFn: async (params, api, extraOptions) => {
        const queryParams = new URLSearchParams();
        const state = api.getState() as RootState;
        
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
        
        const response = result.data as PaginatedApiResponse<Standup>;
        const currentUserStandup = response.data.find(standup => standup.userId === state.auth.user?.id);
        
        // Dispatch actions to update Redux state
        api.dispatch(setStandups(response.data));
        api.dispatch(setPagination(response.pagination));
        if (currentUserStandup) {
          api.dispatch(setCurrentStandup(currentUserStandup));
        } else {
          api.dispatch(setCurrentStandup(null));
        }

        return { data: response };
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

    updateStandup: builder.mutation<Standup, { id: string; data: CreateStandupRequest }>({
      queryFn: async ({ id, data }, api, extraOptions) => {
        const result = await baseQuery({
          url: `/standups/${id}`,
          method: 'PATCH',
          body: data,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        return { data: result.data as Standup };
      },
      invalidatesTags: ['Standups'],
    }),
    
    getUserStandup: builder.query<Standup | null, StandupQuery | void>({
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
          // If no standup found, return null instead of error
          if ('status' in result.error && result.error.status === 404) {
            return { data: null };
          }
          return { error: result.error };
        }

        const response = result.data as PaginatedApiResponse<Standup>;
        api.dispatch(setUserStandups(response.data));
        
        return { data: result.data as Standup };
      },
      providesTags: ['Standups'],
    }),
  }),
});

export const {
  useGetStandupsQuery,
  useCreateStandupMutation,
  useUpdateStandupMutation,
  useGetUserStandupQuery,
} = standupsApi;