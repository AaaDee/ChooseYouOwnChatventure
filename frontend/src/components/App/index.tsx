import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { ChoiceButton } from '../ChoiceButton';

export const App = () => {
  return (
    <StyledApp>
      <Title />
      <ChoiceButton
        content={'test'}
        onClick={() => {
          console.log('clicked!');
        }}
      />
    </StyledApp>
  );
};
