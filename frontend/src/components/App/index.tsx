import React from 'react';
import { Title } from '../Title';
import { StyledApp } from './style';
import { TextBox } from '../TextBox';
import { useSelector } from 'react-redux';
import { selectChoices } from '../../features/choices/selectors';

// const choices: Choice[] = [
//   {
//     id: '1',
//     content: 'fight'
//   },
//   {
//     id: '2',
//     content: 'run'
//   },
//   {
//     id: '3',
//     content: 'hide'
//   }
// ];

export const App = () => {
  const choices = useSelector(selectChoices);
  console.log('choices', choices);
  return (
    <StyledApp>
      <Title />
      <TextBox choices={choices} />
    </StyledApp>
  );
};
