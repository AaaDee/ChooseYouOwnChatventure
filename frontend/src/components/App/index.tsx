import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox';
import { useSelector } from 'react-redux';
import { selectStatusIsLoading } from '../../features/entry/selectors';
import { Spinner } from '../Spinner';
import { LoginForm } from '../LoginForm';

export const App = () => {
  const isLoading = useSelector(selectStatusIsLoading);
  const userId = useSelector(selectStatusIsLoading);
  return (
    <StyledApp>
      <Title />
      {userId && <TextBox />}
      {!userId && <LoginForm />}
      {isLoading && <Spinner />}
    </StyledApp>
  );
};
