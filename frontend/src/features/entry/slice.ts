import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { Choice, TextEntry } from '../../types';
import { postRequest } from '../../requests/postRequest';

export interface EntryState {
  content: string;
  choices: Choice[];
  isLoading: boolean;
}

const initialState: EntryState = {
  choices: [],
  content: '',
  isLoading: false
};

export const fetchStartEntry = createAsyncThunk(
  'entry/fetchStartEntry',
  async (_thunkAPI) => {
    const response = await postRequest('start', {});
    return response.data as TextEntry;
  }
);

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
  },
  extraReducers: (builder: ActionReducerMapBuilder<EntryState>) => {
    builder.addCase(fetchStartEntry.fulfilled, (state, action) => {
      state.choices = action.payload.choices;
      state.content = action.payload.content;
      state.isLoading = false;
    });
    builder.addCase(fetchStartEntry.pending, (state, _action) => {
      state.isLoading = true;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setChoices, setEntry } = choicesSlice.actions;

export default choicesSlice.reducer;
