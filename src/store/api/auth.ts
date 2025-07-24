import { baseApi, baseQuery } from ".";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../../types/apiTypes";
import { setUser, clearUser } from "../slices/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async (credentials, api, extraOptions) => {
        const result = await baseQuery({
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        const data = result.data as AuthResponse;
        
        // Dispatch setUser action to update auth state
        api.dispatch(setUser({ 
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }));
        
        return { data };
      },
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      queryFn: async (credentials, api, extraOptions) => {
        const result = await baseQuery({
          url: '/auth/register',
          method: 'POST',
          body: credentials,
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        const data = result.data as AuthResponse;
        
        // Dispatch setUser action to update auth state
        api.dispatch(setUser({ 
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }));
        
        return { data };
      },
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<void, void>({
      queryFn: async (_, api, extraOptions) => {
        const result = await baseQuery({
          url: '/auth/logout',
          method: 'POST',
        }, api, extraOptions);
        
        if (result.error) {
          return { error: result.error };
        }
        
        // Clear user state on logout
        api.dispatch(clearUser());
        
        return { data: undefined };
      },
      invalidatesTags: ['Auth', 'User'],
    }),
    me: builder.query<User, void>({
      queryFn: async (_, api, extraOptions) => {
        const result = await baseQuery({
          url: '/auth/me',
        }, api, extraOptions);
        
        if (result.error) {
          // Clear user state if me query fails (user not authenticated)
          api.dispatch(clearUser());
          return { error: result.error };
        }
        
        const data = result.data as User;
        
        // Update user state if me query succeeds
        api.dispatch(setUser({ user: data }));
        
        return { data };
      },
      providesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApi;