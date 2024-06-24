import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Choice } from '../../types';

export interface ChoiceState {
  choices: Choice[];
}

const initialState: ChoiceState = {
  choices: []
};

export const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    setChoices: (state, action: PayloadAction<Choice[]>) => {
      state.choices = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setChoices } = choicesSlice.actions;

export default choicesSlice.reducer;
