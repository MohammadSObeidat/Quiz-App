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

    tagTypes: ['group', 'student', 'question', 'quiz'],

    endpoints: (builder) => ({
        quizIncomming: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz/incomming`})
        }),
        quizCompleted: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz/completed`})
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
        getQuizzes: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz`}),
                providesTags: ['quiz'],
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
        getQuiz: builder.query<any, string | null>({
            query: (id) => ({
                url: `/api/quiz/${id}`}),
        }),
        getQuizResult: builder.query<any, void>({
            query: () => ({
                url: `/api/quiz/result`}),
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
        createQuiz: builder.mutation({
            query: (data) => ({
                url: `/api/quiz`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['quiz']
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
        removeQuiz: builder.mutation({
            query: (id) => ({
                url: `/api/quiz/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['quiz']
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
        updateQuiz: builder.mutation({
            query: ({id, data}) => ({
                url: `/api/quiz/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['quiz']
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
                useUpdateQuestionMutation,
                useQuizCompletedQuery,
                useCreateQuizMutation,
                useGetQuizzesQuery,
                useRemoveQuizMutation,
                useGetQuizQuery,
                useUpdateQuizMutation,
                useGetQuizResultQuery} = apiSlice