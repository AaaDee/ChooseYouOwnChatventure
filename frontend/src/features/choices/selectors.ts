import { RootState } from '../../store';

export const selectChoices = (state: RootState) => state.choices.choices;
