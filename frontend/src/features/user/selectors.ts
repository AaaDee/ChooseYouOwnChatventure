import { RootState } from '../../store';
import { StateStatus } from '../enums';

export const selectUser = (state: RootState) => state.user.username;

export const selectHasFailed = (state: RootState) =>
  state.user.status === StateStatus.FAILED;
