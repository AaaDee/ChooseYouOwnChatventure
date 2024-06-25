import React from 'react';
import { render, screen } from '@testing-library/react';
import { OngoingView } from '.';
import { useSelector } from 'react-redux';
import { Choice } from '../../types';

jest.mock('react-redux');

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
  const selector_mock = jest.mocked(useSelector);
  selector_mock.mockReturnValue(choices);
  render(<OngoingView />);
  const elements = await screen.findAllByRole('button');
  expect(elements).toHaveLength(3);
});
