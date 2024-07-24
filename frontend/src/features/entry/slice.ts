import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { PromptResponse, TextEntry } from '../../types';
import { postRequest } from '../../requests/postRequest';
import { StateStatus } from '../enums';
import imageData from '../../test/testImage.json';

export interface EntryState {
  entry?: TextEntry;
  image: string;
  status: StateStatus;
}

const initialState: EntryState = {
  image: imageData.data[0].b64_json,
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
    return response.data as PromptResponse;
  }
);

export const entrySlice = createSlice({
  name: 'entry',
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
      state.entry = action.payload.entry;
      state.image = action.payload.image;
      state.status = StateStatus.IDLE;
    });
    builder.addCase(fetchEntry.pending, (state, _action) => {
      state.status = StateStatus.LOADING;
    });
    builder.addCase(fetchEntry.rejected, (state, _action) => {
      state.status = StateStatus.FAILED;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setEntry, setStatusToRequested } = entrySlice.actions;

export default entrySlice.reducer;
