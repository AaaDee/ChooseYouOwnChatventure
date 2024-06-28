import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox';
import { Spinner } from '../Spinner';

export const App = () => {
  return (
    <StyledApp>
      <Title />
      <TextBox />
      <Spinner />
    </StyledApp>
  );
};
