import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import entryReducer from '../features/entry/slice';
import { StateStatus } from '../features/enums';
import historyReducer from '../features/history/slice';
import imageReducer from '../features/image/slice';
import settingsReducer from '../features/settings/slice';
import userReducer from '../features/user/slice';
import { RootState } from '../store';

// Helper function to render with a mock store
export const renderWithStore = (
  children: React.ReactNode,
  preloadedState: RootState
): RenderResult => {
  const store = configureStore({
    reducer: {
      entry: entryReducer,
      history: historyReducer,
      image: imageReducer,
      user: userReducer,
      settings: settingsReducer
    },
    preloadedState
  });

  return render(<Provider store={store}>{children}</Provider>);
};

// A default state to be overwritten in the tests.

export const defaultEntryState = {
  status: StateStatus.IDLE
};

export const defaultRootState: RootState = {
  entry: defaultEntryState,
  history: {
    entries: [],
    selectedChoices: []
  },
  image: {
    image: '',
    status: StateStatus.IDLE
  },
  user: {
    status: StateStatus.IDLE
  },
  settings: {
    audioMuted: false,
    infoOpen: false
  }
};
