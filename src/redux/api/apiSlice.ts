import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://upskilling-egypt.com:3005',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        quizIncomming: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz/incomming`})
        }),
        topFiveStudent: builder.query<any, void>({
            query: () => ({
                url: `/api/student/top-five`})
        }),
        // createUser: builder.mutation<any, {first_name: string, last_name: string, email: string, role: string, password: string}>({
        //     query: (data) => ({
        //         url: `/api/auth/register`,
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // forgotPassword: builder.mutation<any, {email: string}>({
        //     query: (data) => ({
        //         url: `/api/auth/forgot-password`,
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // resetPassword: builder.mutation<any, {email: string, otp: string, password: string}>({
        //     query: (data) => ({
        //         url: `/api/auth/reset-password`,
        //         method: 'POST',
        //         body: data
        //     })
        // })
    }),
})

export const {useQuizIncommingQuery, useTopFiveStudentQuery} = apiSlice