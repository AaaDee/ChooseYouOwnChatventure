import { RootState } from '../../store';

export const selectAudioMuted = (state: RootState) => state.settings.audioMuted;

export const selectInfoOpen = (state: RootState) => state.settings.infoOpen;
