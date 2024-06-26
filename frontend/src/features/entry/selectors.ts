import { RootState } from '../../store';

export const selectChoices = (state: RootState) => state.entry.choices;

export const selectContent = (state: RootState) => state.entry.content;
