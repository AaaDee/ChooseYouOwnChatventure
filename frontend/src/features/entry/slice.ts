import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Choice, TextEntry } from '../../types';

export interface EntryState {
  content: string;
  choices: Choice[];
}

const initialState: EntryState = {
  choices: [],
  content: ''
};

export const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    setChoices(state, action: PayloadAction<Choice[]>) {
      state.choices = action.payload;
    },
    setEntry(state, action: PayloadAction<TextEntry>) {
      state.choices = action.payload.choices;
      state.content = action.payload.content;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setChoices, setEntry } = choicesSlice.actions;

export default choicesSlice.reducer;
