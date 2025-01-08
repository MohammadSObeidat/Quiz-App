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
        }),
        createUser: builder.mutation<any, {first_name: string, last_name: string, email: string, role: string, password: string}>({
            query: (data) => ({
                url: `/api/auth/register`,
                method: 'POST',
                body: data
            })
        }),
        forgotPassword: builder.mutation<any, {email: string}>({
            query: (data) => ({
                url: `/api/auth/forgot-password`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation<any, {email: string, otp: string, password: string}>({
            query: (data) => ({
                url: `/api/auth/reset-password`,
                method: 'POST',
                body: data
            })
        })
    }),
})

export const {useLoginMutation, useCreateUserMutation, useForgotPasswordMutation, useResetPasswordMutation} = authSlice