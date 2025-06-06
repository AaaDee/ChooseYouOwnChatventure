import React from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { Title } from '../Title/Title';
import { StyledApp, StyledBody } from './style';
import { TextBox } from '../TextBox/TextBox';
import { useSelector } from 'react-redux';
import { selectEntryFailed } from '../../features/entry/selectors';
import { LoginForm } from '../LoginForm/LoginForm';
import { selectUser } from '../../features/user/selectors';
import {
  selectAudioMuted,
  selectInfoOpen
} from '../../features/settings/selectors';
import { Illustration } from '../Illustration/Illustration';
import { ErrorBox } from '../ErrorBox.tsx/ErrorBox';
import { Header } from '../Header/Header';
import { InfoPage } from '../InfoPage/InfoPage';

export const App = () => {
  const isFailed = useSelector(selectEntryFailed);
  const username = useSelector(selectUser);
  const isMuted = useSelector(selectAudioMuted);
  const isInfoOpen = useSelector(selectInfoOpen);

  return (
    <StyledApp>
      <Header />
      <StyledBody>
        <Title />
        <Illustration />
        {isInfoOpen && <InfoPage />}
        {isFailed && <ErrorBox />}
        {username && <TextBox />}
        {!username && <LoginForm />}
        {!isMuted && <AudioPlayer />}
      </StyledBody>
    </StyledApp>
  );
};
