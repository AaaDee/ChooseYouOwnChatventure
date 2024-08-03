import { RootState } from '../../store';
import { StateStatus } from '../enums';

export const selectImage = (state: RootState) => state.image.image;

export const selectImageIsLoading = (state: RootState) =>
  state.image.status === StateStatus.LOADING;

export const selectImageIsRequested = (state: RootState) =>
  state.image.status === StateStatus.REQUESTED;
