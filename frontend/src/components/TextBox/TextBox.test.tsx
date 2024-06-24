import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextBox } from '.';
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

test('renders a button for each choice', async () => {
  render(<TextBox choices={choices} />);
  const elements = await screen.findAllByRole('button');
  expect(elements).toHaveLength(3);
});
