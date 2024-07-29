import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  audioMuted: boolean;
  infoOpen: boolean;
}

const initialState: SettingsState = {
  audioMuted: true,
  infoOpen: false
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAudioMuted(state, action: PayloadAction<boolean>) {
      state.audioMuted = action.payload;
    },
    setInfoOpen(state, action: PayloadAction<boolean>) {
      state.infoOpen = action.payload;
    }
  }
});

export const { setAudioMuted, setInfoOpen } = settingsSlice.actions;

export default settingsSlice.reducer;
