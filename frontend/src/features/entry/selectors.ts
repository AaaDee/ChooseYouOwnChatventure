import { RootState } from '../../store';
import { StateStatus } from '../enums';

export const selectChoices = (state: RootState) => state.entry.entry?.choices;
export const selectContent = (state: RootState) => state.entry.entry?.content;
export const selectImage = (state: RootState) => state.entry.image;

export const selectStatusIsLoading = (state: RootState) => {
  return (
    state.entry.status === StateStatus.LOADING ||
    state.user.status == StateStatus.LOADING
  );
};

export const selectEntryFailed = (state: RootState) => {
  return state.entry.status === StateStatus.FAILED;
};

export const selectStatusIsRequested = (state: RootState) =>
  state.entry.status === StateStatus.REQUESTED;

export const selectEntry = (state: RootState) => state.entry.entry;
