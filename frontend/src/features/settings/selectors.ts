import { RootState } from '../../store';

export const selectAudioMuted = (state: RootState) => state.settings.audioMuted;
