import { RootState } from '../../store';
import { EntryStateStatus } from './slice';

export const selectChoices = (state: RootState) => state.entry.entry?.choices;
export const selectContent = (state: RootState) => state.entry.entry?.content;
export const selectStatusIsLoading = (state: RootState) =>
  state.entry.status === EntryStateStatus.LOADING;
export const selectStatusIsRequested = (state: RootState) =>
  state.entry.status === EntryStateStatus.REQUESTED;

export const selectEntry = (state: RootState) => state.entry.entry;
