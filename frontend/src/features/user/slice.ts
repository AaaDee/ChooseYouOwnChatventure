import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StateStatus } from '../enums';

export interface UserState {
  id?: string;
  status: StateStatus;
}

const initialState: UserState = {
  status: StateStatus.IDLE
};

// export const fetchEntry = createAsyncThunk(
//   'entry/fetchStartEntry',
//   async (data: EntryRequestData, _thunkAPI) => {
//     const response = await postRequest(data.endpoint, data.data);
//     return response.data as TextEntry;
//   }
// );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.id = action.payload;
    }
  }
  // extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
  //   builder.addCase(fetchEntry.fulfilled, (state, action) => {
  //     state.entry = action.payload;
  //     state.status = EntryStateStatus.IDLE;
  //   });
  //   builder.addCase(fetchEntry.pending, (state, _action) => {
  //     state.status = EntryStateStatus.LOADING;
  //   });
  // }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
