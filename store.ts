import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth-slice'
import navReducer from './slices/navSlice'
export const store = configureStore({
  reducer: {
      nav: navReducer,
      auth: authSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch