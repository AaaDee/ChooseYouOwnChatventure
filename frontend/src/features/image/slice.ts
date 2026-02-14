import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imageData from '../../images/startImage.json';
import { Endpoints } from '../../requests/endoints';
import { postRequest } from '../../requests/postRequest';
import { ImageDescription } from '../../types';
import { StateStatus } from '../enums';

export interface ImageState {
  image: string;
  status: StateStatus;
}

const initialState: ImageState = {
  image: imageData.data[0].b64_json,
  status: StateStatus.IDLE
};

export const fetchImage = createAsyncThunk(
  'entry/fetchImage',
  async (data: ImageDescription, _thunkAPI) => {
    const response = await postRequest(Endpoints.IMAGE, data);
    return response.data as string;
  }
);

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setImageStatusToRequested(state) {
      state.status = StateStatus.REQUESTED;
    }
  },

  extraReducers: (builder: ActionReducerMapBuilder<ImageState>) => {
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.image = action.payload;
      state.status = StateStatus.IDLE;
    });
    builder.addCase(fetchImage.pending, (state, _action) => {
      state.status = StateStatus.LOADING;
    });
    builder.addCase(fetchImage.rejected, (state, _action) => {
      state.status = StateStatus.FAILED;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setImage, setImageStatusToRequested } = imageSlice.actions;

export default imageSlice.reducer;
