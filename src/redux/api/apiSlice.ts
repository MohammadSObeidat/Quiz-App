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

    tagTypes: ['group', 'student', 'question'],

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
            providesTags: ['group', 'student'],
        }),
        getStudents: builder.query<any, void>({
            query: () => ({
                url: `/api/student`}),
        }),
        getStudentsWithOutGroup: builder.query<any, void>({
            query: () => ({
                url: `/api/student/without-group`}),
            providesTags: ['group', 'student'],
        }),
        getGroup: builder.query<any, string | null>({
            query: (id) => ({
                url: `/api/group/${id}`}),
            providesTags: ['group', 'student'],
        }),
        getQuestions: builder.query<any, void>({
            query: () => ({
                url: `/api/question`}),
            providesTags: ['question'],
        }),
        getQuestion: builder.query<any, string | null>({
            query: (id) => ({
                url: `/api/question/${id}`}),
        }),
        createGroup: builder.mutation({
            query: (data) => ({
                url: `/api/group`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['group', 'student']
        }),
        createQuestion: builder.mutation({
            query: (data) => ({
                url: `/api/question`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['question']
        }),
        removeGroup: builder.mutation({
            query: (id) => ({
                url: `/api/group/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['group', 'student']
        }),
        removeQuestion: builder.mutation({
            query: (id) => ({
                url: `/api/question/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['question']
        }),
        updateGroup: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/group/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['group', 'student']
        }),
        updateQuestion: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/question/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['question']
        }),
    }),
})

export const {useQuizIncommingQuery, 
                useTopFiveStudentQuery, 
                useGetGroupsQuery, 
                useGetStudentsQuery,
                useCreateGroupMutation,
                useRemoveGroupMutation,
                useUpdateGroupMutation,
                useGetGroupQuery,
                useGetStudentsWithOutGroupQuery,
                useGetQuestionsQuery,
                useRemoveQuestionMutation,
                useCreateQuestionMutation,
                useGetQuestionQuery,
                useUpdateQuestionMutation} = apiSlice