import React from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { Title } from '../Title/Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox/TextBox';
import { useSelector } from 'react-redux';
import {
  selectStatusIsFailed,
  selectStatusIsLoading
} from '../../features/entry/selectors';
import { Spinner } from '../Spinner/Spinner';
import { LoginForm } from '../LoginForm/LoginForm';
import { selectUser } from '../../features/user/selectors';
import { selectAudioMuted } from '../../features/settings/selectors';
import { Illustration } from '../Illustration/Illustration';
import { ErrorBox } from '../ErrorBox.tsx/ErrorBox';

export const App = () => {
  const isLoading = useSelector(selectStatusIsLoading);
  const isFailed = useSelector(selectStatusIsFailed);
  const username = useSelector(selectUser);
  const isMuted = useSelector(selectAudioMuted);

  return (
    <StyledApp>
      <Title />
      <Illustration />
      {isFailed && <ErrorBox />}
      {username && <TextBox />}
      {!username && <LoginForm />}
      {isLoading && <Spinner />}
      {!isMuted && <AudioPlayer />}
    </StyledApp>
  );
};
