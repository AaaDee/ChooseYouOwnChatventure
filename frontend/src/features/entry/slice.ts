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

interface EntryRequestData {
  endpoint: string;
  data: object;
}

export const fetchEntry = createAsyncThunk(
  'entry/fetchStartEntry',
  async (data: EntryRequestData, _thunkAPI) => {
    const response = await postRequest(data.endpoint, data.data);
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
    builder.addCase(fetchEntry.fulfilled, (state, action) => {
      state.choices = action.payload.choices;
      state.content = action.payload.content;
      state.isLoading = false;
    });
    builder.addCase(fetchEntry.pending, (state, _action) => {
      state.isLoading = true;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setChoices, setEntry } = choicesSlice.actions;

export default choicesSlice.reducer;
