import { RootState } from '../../store';

export const selectEntries = (state: RootState) => state.history.entries;
export const selectSelectedChoices = (state: RootState) =>
  state.history.selectedChoices;
