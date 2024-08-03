import { configureStore } from '@reduxjs/toolkit';
import entryReducer from './features/entry/slice';
import historyReducer from './features/history/slice';
import imageReducer from './features/image/slice';
import userReducer from './features/user/slice';
import settingsReducer from './features/settings/slice';

export const store = configureStore({
  reducer: {
    entry: entryReducer,
    history: historyReducer,
    image: imageReducer,
    user: userReducer,
    settings: settingsReducer
  }
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
