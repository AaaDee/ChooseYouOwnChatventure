import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox';
import { Choice } from '../../types';

const choices: Choice[] = [
  {
    id: '1',
    content: 'fight'
  },
  {
    id: '2',
    content: 'run'
  },
  {
    id: '3',
    content: 'hide'
  }
];

export const App = () => {
  return (
    <StyledApp>
      <Title />
      <TextBox choices={choices} />
    </StyledApp>
  );
};
