import { baseApi, baseQuery } from ".";
import type { ApiResponse, User } from "../../types/apiTypes";
import { clearUser } from "../slices/authSlice";
import { setUsers } from "../slices/userSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse, void>({
      queryFn: async (_, api, extraOptions) => {
        const result = await baseQuery({
          url: '/users',
        }, api, extraOptions);
        
        if (result.error) {
          // Clear user state if getUsers query fails (user not authenticated)
          api.dispatch(clearUser());
          return { error: result.error };
        }
        
        const data = result.data as ApiResponse<User[]>;
        
        // Update user state if getUsers query succeeds
        api.dispatch(setUsers({ user: data.data as User[] }));
        
        return { data };
      },
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = authApi;