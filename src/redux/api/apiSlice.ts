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

    tagTypes: ['group', 'student'],

    endpoints: (builder) => ({
        quizIncomming: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz/incomming`})
        }),
        topFiveStudent: builder.query<any, void>({
            query: () => ({
                url: `/api/student/top-five`})
        }),
        getGroups: builder.query<any, void>({
            query: () => ({
                url: `/api/group`}),
            providesTags: ['group']
        }),
        getStudents: builder.query<any, void>({
            query: () => ({
                url: `/api/student/without-group`}),
            providesTags: ['student']
        }),
        getGroup: builder.query<any, void>({
            query: (id) => ({
                url: `/api/group/${id}`}),
        }),
        createGroup: builder.mutation({
            query: (data) => ({
                url: `/api/group`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['group', 'student']
        }),
        removeGroup: builder.mutation({
            query: (id) => ({
                url: `/api/group/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['group', 'student']
        }),
        updateGroup: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/group/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['group', 'student']
        })
    }),
})

export const {useQuizIncommingQuery, 
                useTopFiveStudentQuery, 
                useGetGroupsQuery, 
                useGetStudentsQuery,
                useCreateGroupMutation,
                useRemoveGroupMutation,
                useUpdateGroupMutation,
                useGetGroupQuery} = apiSlice