import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { StateStatus } from '../enums';
import { postRequest } from '../../requests/postRequest';
import { User, UserInput } from '../../types';

export interface UserState {
  username?: string;
  status: StateStatus;
}

const initialState: UserState = {
  status: StateStatus.IDLE
};

interface UserRequestData {
  endpoint: string;
  data: UserInput;
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (data: UserRequestData, _thunkAPI) => {
    const response = await postRequest(data.endpoint, data.data);

    if (response.status == 401) {
      throw new Error('unauthorised');
    }
    // todo fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    window.localStorage.setItem('token', response.data.token);

    return response.data as User;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.username = action.payload;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.status = StateStatus.IDLE;
    });
    builder.addCase(fetchUser.pending, (state, _action) => {
      state.status = StateStatus.LOADING;
    });
    builder.addCase(fetchUser.rejected, (state, _action) => {
      state.status = StateStatus.FAILED;
    });
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
