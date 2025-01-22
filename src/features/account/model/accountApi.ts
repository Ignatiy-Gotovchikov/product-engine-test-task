import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
	UserData, 
	GetUserResponse,
	UpdateUserRequest,
	UpdateUserResponse,
} from './types';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api/'
  }),
  endpoints: (builder) => ({
    getAccountById: builder.query<UserData | null, number>({
      query: (id) => `users/${id}`,
      transformResponse: (response: GetUserResponse) => {
        if (!response?.data) {
          return null;
        }
        return response.data;
      }
    }),

    updateAccount: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body
      })
    })
  })
});

export const {
  useGetAccountByIdQuery,
  useLazyGetAccountByIdQuery,
  useUpdateAccountMutation,
} = accountApi;
