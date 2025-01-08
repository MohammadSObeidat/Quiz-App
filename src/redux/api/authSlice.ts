import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://upskilling-egypt.com:3005' }),
    endpoints: (builder) => ({
        login: builder.mutation<any, {email: string, password: string}>({
            query: (data) => ({
                url: `/api/auth/login`,
                method: 'POST',
                body: data
            })
        })
    }),
})

export const {useLoginMutation} = authSlice