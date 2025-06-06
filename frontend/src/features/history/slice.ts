import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TextEntry } from '../../types';

export interface HistoryState {
  entries: TextEntry[];
  selectedChoices: number[];
}

const initialState: HistoryState = {
  entries: [],
  selectedChoices: []
};

export const choicesSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setEntries(state, action: PayloadAction<TextEntry[]>) {
      state.entries = action.payload;
    },
    setSelectedChoices(state, action: PayloadAction<number[]>) {
      state.selectedChoices = action.payload;
    },
    addEntry(state, action: PayloadAction<TextEntry>) {
      state.entries.push(action.payload);
    },
    addSelectedChoice(state, action: PayloadAction<number>) {
      state.selectedChoices.push(action.payload);
    }
  }
});

export const { addEntry, addSelectedChoice, setEntries, setSelectedChoices } =
  choicesSlice.actions;

export default choicesSlice.reducer;
