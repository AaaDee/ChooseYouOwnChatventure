import React from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { Title } from '../Title/Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox/TextBox';
import { useSelector } from 'react-redux';
import { selectStatusIsLoading } from '../../features/entry/selectors';
import { Spinner } from '../Spinner/Spinner';
import { LoginForm } from '../LoginForm/LoginForm';
import { selectUser } from '../../features/user/selectors';
import { selectAudioMuted } from '../../features/settings/selectors';

export const App = () => {
  const isLoading = useSelector(selectStatusIsLoading);
  const username = useSelector(selectUser);
  const isMuted = useSelector(selectAudioMuted);
  return (
    <StyledApp>
      <Title />
      {username && <TextBox />}
      {!username && <LoginForm />}
      {isLoading && <Spinner />}
      {!isMuted && <AudioPlayer />}
    </StyledApp>
  );
};
