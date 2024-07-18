import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  audioMuted: boolean;
}

const initialState: SettingsState = {
  audioMuted: true
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAudioMuted(state, action: PayloadAction<boolean>) {
      state.audioMuted = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setAudioMuted } = settingsSlice.actions;

export default settingsSlice.reducer;
