import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from '../slice/userSlice'
import { authSlice } from '../api/authSlice'
import { apiSlice } from '../api/apiSlice'

export const store = configureStore({
  reducer: {
    user: userDataReducer,
    [authSlice.reducerPath] : authSlice.reducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(apiSlice.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch