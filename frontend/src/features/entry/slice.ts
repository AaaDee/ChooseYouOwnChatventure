import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { TextEntry } from '../../types';
import { postRequest } from '../../requests/postRequest';
import { StateStatus } from '../enums';

export interface EntryState {
  entry?: TextEntry;
  status: StateStatus;
}

const initialState: EntryState = {
  status: StateStatus.IDLE
};

interface EntryRequestData {
  endpoint: string;
  data: object; // todo fix type
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
    setEntry(state, action: PayloadAction<TextEntry>) {
      state.entry = action.payload;
    },
    setStatusToRequested(state) {
      state.status = StateStatus.REQUESTED;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<EntryState>) => {
    builder.addCase(fetchEntry.fulfilled, (state, action) => {
      state.entry = action.payload;
      state.status = StateStatus.IDLE;
    });
    builder.addCase(fetchEntry.pending, (state, _action) => {
      state.status = StateStatus.LOADING;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setEntry, setStatusToRequested } = choicesSlice.actions;

export default choicesSlice.reducer;
