import { configureStore } from '@reduxjs/toolkit';
import choicesReducer from './features/choices/slice';

export const store = configureStore({
  reducer: {
    choices: choicesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
