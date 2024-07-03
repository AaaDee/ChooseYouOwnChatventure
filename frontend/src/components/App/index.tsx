import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox';
import { useSelector } from 'react-redux';
import { selectStatusIsLoading } from '../../features/entry/selectors';
import { Spinner } from '../Spinner';

export const App = () => {
  const isLoading = useSelector(selectStatusIsLoading);
  return (
    <StyledApp>
      <Title />
      <TextBox />
      {isLoading && <Spinner />}
    </StyledApp>
  );
};
